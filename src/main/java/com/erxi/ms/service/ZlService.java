package com.erxi.ms.service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * redis 缓存 总览 以及 下拉选车辆公司
 * @author erxi
 * @date : 2018年11月27日 下午3:48:11
 */
@Service
public class ZlService {
	@Autowired
	TlaqService tlaqService;
	
	@Autowired
    WsfwServics wsfwservics;
	
	@Autowired
	SbwxService sbwxService;
	@Transactional
	public void zl(){
		ScheduledExecutorService service = Executors.newScheduledThreadPool(3);
        //延时1秒执行,每5分钟执行一次
        service.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                System.out.println("-----zl redis init-----");
                TlaqService.flag = true;
                
                try {
					tlaqService.yyzl();
					tlaqService.yyzls();
					tlaqService.yyzlss();
					tlaqService.yyzlsss();
					tlaqService.yyzlssss();
					//重点抓拍车辆
					tlaqService.focusMonitor();					
					//故障车辆抓拍
					tlaqService.faultMonitor();
					
					tlaqService.qyveh();
					tlaqService.qycomp();
					tlaqService.qyarea();
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				TlaqService.flag = false;
				
				WsfwServics.flag = true;
				//计价器涉及公司
				wsfwservics.qycomp();
				WsfwServics.flag = false;
				
				SbwxService.flag = true;
				//维修涉及公司
				sbwxService.qycomp();
				SbwxService.flag = false;
				
				System.out.println("-----zl redis over-----");
            }
        }, 1, 300, TimeUnit.SECONDS);
	}
}
