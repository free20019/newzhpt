package com.erxi.ms.druid;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;

@Configuration
public class DruidDataSourceConfig {
	/**
	 * 注册一个StatViewServlet
	 */
	@Bean
	public ServletRegistrationBean druidStatViewServlet() {
		// org.springframework.boot.context.embedded.ServletRegistrationBean提供类的进行注册.
		ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(
				new StatViewServlet(), "/druid/*");

		// 添加初始化参数：initParams
		// 白名单：
		servletRegistrationBean.addInitParameter("allow", "127.0.0.1");
		// IP黑名单 (存在共同时，deny优先于allow) : 如果满足deny的话提示:Sorry, you are not
		// permitted to view this page.
		servletRegistrationBean.addInitParameter("deny", "192.168.1.73");
		// 登录查看信息的账号密码.
		servletRegistrationBean.addInitParameter("loginUsername", "erxi");
		servletRegistrationBean.addInitParameter("loginPassword", "123");
		// 是否能够重置数据.
		servletRegistrationBean.addInitParameter("resetEnable", "true");// 禁用HTML页面上的“Reset
																		// All”功能
		return servletRegistrationBean;
	}

	/**
	 * 注册一个：filterRegistrationBean
	 */
	@Bean
	public FilterRegistrationBean druidStatFilter() {

		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(
				new WebStatFilter());
		filterRegistrationBean.setName("druidWebStatFilter");
		// 添加过滤规则.
		filterRegistrationBean.addUrlPatterns("/*");
		// 添加忽略的格式信息.
		filterRegistrationBean.addInitParameter("exclusions",
				"*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
		return filterRegistrationBean;
	}
}
