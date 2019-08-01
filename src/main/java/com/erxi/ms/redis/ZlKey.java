package com.erxi.ms.redis;

public class ZlKey extends BasePrefix {

	private ZlKey(int expireSeconds, String prefix) {
		super(expireSeconds, prefix);
	}

	//营运车辆数
	public static ZlKey busyVehi = new ZlKey(500, "bv");
	//行业营运状况
	public static ZlKey busyStatus = new ZlKey(500, "bs");
	//行业运行情况
	public static ZlKey busyOnline = new ZlKey(500, "bo");
	
	//业户
	public static ZlKey Comp = new ZlKey(500, "comp");
	//车辆
	public static ZlKey Vehi = new ZlKey(500, "vehi");
	//驾驶员
	public static ZlKey Per = new ZlKey(500, "per");
	
	//重点抓拍车辆
	public static ZlKey Focus = new ZlKey(500, "focus");
	//故障车辆抓拍
	public static ZlKey Fault = new ZlKey(500, "fault");
	
	
	//车载 故障
	public static ZlKey machine = new ZlKey(500, "mac");
	//投诉
	public static ZlKey complaint = new ZlKey(500, "cl");
	
	
	//下拉公司
	public static ZlKey selectcomp = new ZlKey(500, "sc");
	//下拉车辆
	public static ZlKey selectvehi = new ZlKey(500, "sv");
	//下拉区域
	public static ZlKey selectarea = new ZlKey(500, "sa");
}
