## 德尔福车辆管理系统

### 测试地址 


### 用户登录

### 车辆维修
#### 维修申请
#### 维修列表
#### 维修员填写
#### 维修列表置顶
#### 维修列表删除

### 驾驶员
#### 驾驶员列表 ok
#### 驾驶员添加 ok
#### 驾驶员授权 单个/批量 ok
#### 驾驶员删除 单个/批量 ok
#### 驾驶员信息获取 ok
#### 驾驶员更新 ok

#### 获取驾驶员分组 ok

### 车辆出入
#### 车辆出入列表 ok
#### 车辆出入删除删除 


### 车辆维修  更新时间 2018年6月12日(星期二)
#### 维修申请 ok OK
#### 维修列表查询 ok OK
#### 维修列表过滤 ok OK
#### 维修查询 ok 通过车辆编号 OK
#### 维修详情 ok OK
#### 维修置顶 ok 
#### 分配任务 ok OK
#### 维修完成 ok OK
#### 添加维修工 //
#### 删除维修工 //
#### 查询维修工 ok OK


### 车辆保养
#### 保养记录删除 ok
#### 保养记录查询 ok
#### 保养记录提交 ok


### 车辆模块
#### 车辆总表

#### 保险申请 //
#### 保险录入 //
#### 申请续保 //
#### 保险列表 ok
#### 保险查询 //



### 车辆分组
#### 添加分组 //
#### 删除分组 //
#### 查询分组 ok
#### 更新分组 //

### 车辆相关
#### 生成车辆编码 ok
#### 接车点检 ok
#### 接车点检更新 ok
#### 接车点检信息查询 ok
#### 车辆录入 ok
#### 车辆录入更新 ok
#### 车辆录入信息查询 ok
#### 安全检查 ok
```javascript
[
  {
    "checkExplanation": "string",
    "checkingExplanation": "string",
    "item": "string",
    "request": "string",
    "status": "string",
    "uuid": "string",
    "vSn": "string"
  }
]
```
#### 安全检查更新 ok
#### 安全检查信息查询 ok
#### 车辆缸压检查 ok
```javascript
{
  "actual_p": 0,
  "cylinder_p": 0,
  "four_p": 0,
  "fuel_p": 0,
  "id": 0,
  "one_p": 0,
  "three_p": 0,
  "two_p": 0,
  "vSn": "string"
}
```
#### 车辆缸压检查更新 ok
#### 车辆缸压检查信息查询 ok 
#### bom检查 ok
```javascript
[
  {
    "uuid": "string",
    "vSn": "string",
    "bomName": "string",
    "bomNum": "string",
    "status": "string",
    "applyPerson": "string",
    "checkExplanation": "string",
    "checkingExplanation": "string",
    "applyTime": "2018-06-05T06:26:16.746Z"
  }
]
```
#### bom检查更新 ok
#### bom检查信息查询 ok
#### 线束检查 ok
```javascript
[
  {
    "checkExplanation": "string",
    "checkPerson": "string",
    "checkTime": "2018-06-05T06:26:16.748Z",
    "checkingPerson": "string",
    "checkingTime": "string",
    "item": "string",
    "status": "string",
    "uuid": "string",
    "vSn": "string"
  }
]
```
#### 线束检查更新 ok
#### 线束检查信息查询 ok
#### 还车点检 ok
```javascript
{
  "fire": 0,
  "forpeople": "string",
  "id": 0,
  "jack": 0,
  "keyy": 0,
  "odometer": 0,
  "operate_time": "2018-06-05T06:26:16.754Z",
  "operator": "string",
  "pick_card": "string",
  "pick_tel": "string",
  "pickone": "string",
  "proposer": "string",
  "sparetyre": 0,
  "time": "2018-06-05T06:26:16.754Z",
  "toolisrecycled": "string",
  "tools": 0,
  "trans_sn": "string",
  "vSn": "string",
  "warningboard": 0
}
```
#### 车辆审核 ok 
```javascript
{
  "vSn": "string",
  "status": "string",
  "explanation": "string"
}
```
#### 车辆审核更新
#### 车辆审核信息查看
#### 获取审核视图
#### 研发记录查询
#### 车辆录入
```javascript
{
  "vSn": "车辆编号",
  "project_sn": "项目编号",
  "project_name": "项目名称",
  "projectEngineer": "项目工程师",
  "vin": "车架号",
  "engineNumber": "发动机编号",
  "engineType": "发动机型号",
  "carName": "车辆名称",
  "groupName": "分组名称",
  "vCarType": "车辆类型",
  "engineCapacity": "发动机排量",
  "pictureUrl": "照片路径",
  "GBTS": "变速箱规格",
  "FuelType": "燃油规格",
  "oilspecification": "机油规格",
  "tyresize": "轮胎规格",
  "reaTireP": "后轮胎压力",
  "customer": "客户",
  "vehicleQuality": "重量",
  "seats": "座位数",
  "adminName": "车管",
  "price": "价值",
  "remark": "备注",
}
```
#### bom零部件查验
```javascript
[
  {
    "bomName": "string",
    "bomnum": "string",
    "ApplyPerson": "string",
    "vSn": "string"
  }
]
```
#### 研发工具安装申请 
```javascript
[
  {
    "toolName": "string",
    "applicant": "string",
    "vSn": "string"
  }
]
```
#### 研发工具安装
#### 研发工具安装查看
#### 研发工具拆除

#### 车辆详情
#### 车辆总表-筛选
#### 检查添加说明/解决方法 ok
#### 还车点检结束
#### 地图

#### 维修记录、保养记录
#### 检查需要 不能重复提交的判断机制

#### 接车点检更新
#### bom查验列表请求
#### 线束检查
#### 车辆查询-vSn


<!-- 问题 -->
1. 车牌列表请求错误
http://47.98.182.165/car-management/license/query.action
```javascript
{
  "ret": false,
  "msg": "System error",
  "data": null
}
```
1. 获取当前设备的网络类型
2. 获取当前网络类型
3. 判断当前网络是否可以联网
4. 更改当前网络类型为4G


1. 搜索
2. 筛选
3. 地图
4. 权限


#### maintain/维修技师
1. 安全检查
2. 线束检查
3. bom检查
4. 项目状态更改
5. 总表浏览
#### admin/超级管理员
#### engineer/工程师
1. 维修申请
2. 接车点检
3. 车辆录入
4. 研发工具安装
5. 还车
6. 保险管理 
#### maintenanceManager/维修管理员
1. 维修列表浏览
2. 维修大屏查看
#### assistant/助理
#### driverManager/驾驶员管理员
#### uppeople/接车员
#### plateHandle/试验车牌办理人员
token 