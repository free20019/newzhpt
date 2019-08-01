package com.erxi.ms.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;

/**
 * 多数据源配置类
 */
@Configuration
public class DataSourceConfig {
	// 数据源1
	@Bean(name = "datasource1")
	@Primary
	@ConfigurationProperties(prefix = "spring.datasource.db1")
	// application.properteis中对应属性的前缀
	public DataSource dataSource1() {
		return DruidDataSourceBuilder.create().build();
		// return
		// DataSourceBuilder.create().type(DruidDataSource.class).build();
	}

	// 数据源2
	@Bean(name = "datasource2")
	@ConfigurationProperties(prefix = "spring.datasource.db2")
	// application.properteis中对应属性的前缀
	public DataSource dataSource2() {
		return DruidDataSourceBuilder.create().build();
		// return
		// DataSourceBuilder.create().type(DruidDataSource.class).build();
	}
	// 数据源3
//	@Bean(name = "datasource3")
//	@ConfigurationProperties(prefix = "spring.datasource.db3")
//	// application.properteis中对应属性的前缀
//	public DataSource dataSource3() {
//		return DruidDataSourceBuilder.create().build();
//		// return
//		// DataSourceBuilder.create().type(DruidDataSource.class).build();
//	}
//	
//	
//	// 数据源4
//	@Bean(name = "datasource4")
//	@ConfigurationProperties(prefix = "spring.datasource.db4")
//	// application.properteis中对应属性的前缀
//	public DataSource dataSource4() {
//		return DruidDataSourceBuilder.create().build();
//		// return
//		// DataSourceBuilder.create().type(DruidDataSource.class).build();
//	}
	/**
	 * 动态数据源: 通过AOP在不同数据源之间动态切换
	 * 
	 * @return
	 */
	@Primary
	@Bean(name = "dynamicDataSource")
	public DataSource dynamicDataSource() {
		DynamicDataSource dynamicDataSource = new DynamicDataSource();
		// 默认数据源
//		dynamicDataSource.setDefaultTargetDataSource(dataSource3());
		dynamicDataSource.setDefaultTargetDataSource(dataSource1());
		// 配置多数据源
		Map<Object, Object> dsMap = new HashMap<Object, Object>();
		dsMap.put("datasource1", dataSource1());
		dsMap.put("datasource2", dataSource2());
//		dsMap.put("datasource3", dataSource3());
//		dsMap.put("datasource4", dataSource4());

		dynamicDataSource.setTargetDataSources(dsMap);
		return dynamicDataSource;
	}

	@Bean
	@ConfigurationProperties(prefix = "mybatis")
	public SqlSessionFactoryBean sqlSessionFactoryBean() {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dynamicDataSource());
		return sqlSessionFactoryBean;
	}

	/**
	 * 配置@Transactional注解事物
	 * 
	 * @return
	 */
	@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dynamicDataSource());
	}
}