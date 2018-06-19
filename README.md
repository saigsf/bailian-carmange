## 德尔福车辆管理系统

### 账号权限
#### admin
##### all 拥有所有权限

#### 车辆录入人员
#### 车辆检查人员
#### 车辆审核人员

### 车辆录入操作流程

1. 点击车辆选项
2. 进入车辆首页（车辆录入页面）
3. 填写信息，带星号为必填项
4. 点击保存，执行提交信息操作，需要输入校验
5. 检查当前车辆是否被录入，如果没有，则进行下面操作，否则返回
6. 车辆录入信息提交
7. 提交成功，进入接车点检页面，传递相关参数到点检页面，如：车辆编号，发动机编号，车架号等
8. 车辆点检信息填写，获取车辆录入页面的参数信息。
9. 点击保存，执行提交信息操作，需要输入校验
10. 提交成功，进入车辆安全附件检查页面
11. 获取检查模块列表，对页面内容进行DOM操作，
12. 获取每一个模块的检查内容，添加到页面。
13. 填写内容，添加注释说明，页面传值
14. 每个模块都审核完成后，页面跳转到车辆审核页面

### 2018/5/8
### popover页面特效 ok 要完善时动作更流畅
### 顶部导航特效 ok

### 车辆页面
#### 车辆列表 ok
#### 车辆搜索 
#### 车辆信息 
#### 车辆删除 ok
#### 未完成录入车辆列表 ok
#### 未完成录入车辆删除 ok
#### 车辆审核-数据可视化
#### 车辆审核-未审核列表 ok
#### 车辆审核-未通过审核列表 ok
#### 车辆审核-已审核 ok
#### 车辆审核-删除列表
#### 车辆录入 ok
#### 接车检点 ok
#### 安全检查
1. 获取检查列表
##### 车辆/安全/附件检查
1. 获取检查列表
2. 提交检查信息 ok
##### 线束检查
1. 获取检查列表
2. 提交检查信息 ok
##### EMS系统BOM零部件检查
1. 获取检查列表
2. 提交检查信息 ok
#### 还车点检


### 维修页面
#### 维修申请 ok
#### 维修列表 ok
#### 列表表删除 ok
#### 列表置顶 ok
#### 维修人员填写 ok
#### 维修信息查看 ok
#### 维修搜索 ok


### 门岗页面 后台数据接口未完成
#### 驾驶员录入 
#### 驾驶员列表 ok
#### 驾驶员信息查看 
#### 驾驶员授权/不授权 ok
#### 车辆出入列表 
#### 车辆列表删除 
#### 车辆通过/不通过 

### 地图API
#### 调用手机的Map接口
#### 使用百度地图API

### 地图数据
#### 所有车辆实时定位数据 ok
#### 单个车辆实时数据查询 ok
#### 车辆历史轨迹数据 ok 数据获取
#### 模糊匹配车辆编号 ok



### 登陆逻辑 验证码取消
### 车辆录入 需求更改需重新更改设计
### 地图展示 需要封装整理
### 下拉刷新上拉加载？？？？




<!-- 数据重新获取接口 -->
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
#### 添加维修工 
#### 删除维修工
#### 查询维修工 ok OK


### 车辆保养
#### 保养记录删除 ok
#### 保养记录查询 ok
#### 保养记录提交 ok


### 车辆模块
#### 车辆总表

#### 保险申请 ok
#### 保险录入 ok
#### 申请续保
#### 保险列表
#### 保险查询



### 车辆分组
#### 添加分组
#### 删除分组
#### 查询分组
#### 更新分组

### 车辆相关
#### 生成车辆编码
#### 接车点检
#### 接车点检更新
#### 接车点检信息查询
#### 车辆录入
#### 车辆录入更新
#### 车辆录入信息查询
#### 安全检查
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
#### 安全检查更新
#### 安全检查信息查询
#### 车辆缸压检查
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
#### 车辆缸压检查更新
#### 车辆缸压检查信息查询
#### bom检查
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
#### bom检查更新
#### bom检查信息查询
#### 线束检查
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
#### 线束检查更新
#### 线束检查信息查询
#### 还车点检
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
#### 车辆审核
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