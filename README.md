# 德尔福车辆管理系统

## 简介

## 页面结构

### 1.登录页面`login.html`

#### a.页面说明

使用`netID`或`员工卡号`登录

#### b.相关操作

1. 点击登录按钮提交登录信息
2. 登录方式切换

### 2.主页面`index.html`

#### a.页面说明

最顶部页面，包含底部导航栏，分别为gps，车辆，门岗，维修，我的五大模块。

#### b.相关操作

底部导航切换

### 3.1.GPS模块起始页`home.html`

#### a.页面说明

车辆实时数据显示，在地图上显示车辆的实时位置，并且可以查看指定车辆的相关信息。可以通过`车辆编号`搜索某一车辆的实时数据。

#### b.相关操作

1. 实时数据查询
2. 跳转到轨迹查询页

### 3.2.轨迹查询`home-track.html`

#### a.页面说明

通过`车辆编号`查询某一个时间段内的车辆辆轨迹，并在地图上显示。

#### b.相关操作

1. 轨迹查询

### 4.车辆模块起始页`vehicle.html`

### 4.1.车辆总表`vehicle-list.html`

#### a.页面说明

将所有车辆以列表的形式展示出来。再通过列表对每一辆车进行操作。

#### b.相关操作

1. 更改项目状态，
2. 修改监测站车型，
3. 查看车辆`主要信息`，
4. 搜索指定`车辆编号`的车辆，
5. 车辆筛选，筛选出符合条件的车辆。

### 4.1.1.车辆总表信息`vehicel-list-info.html`

#### a.页面说明

显示选中车辆的`主要信息`

#### b.相关操作

1. 查看车辆详细信息

### 4.1.1.1.车辆详情`vehicle-info.html`

#### a.页面说明

展示所选车辆的所有数据

#### b.相关操作

1. 查看某一小部分的信息，并进行修改操作

### 4.1.2.更改项目状态`vehicle-program-status.html`

更改所选项目的项目状态。

### 4.1.3.修改检查站车型`vehicle-type-change.html`

更改当前车辆的监测站车型

### 4.2.车辆录入`vehicle-check-up.html`

#### a.页面说明

新车录入的接车点检部分。填写有关接车点检的信息。
>带红色`*`的为必填项。

#### b.相关操作

1. 点击下一步进入基本信息录入页`vehicle-input.html`

### 4.2.1.基本信息录入`vehicle-input.html`

#### a.页面说明

填写车辆基本信息。
>带红色`*`的为必填项。

#### b.相关操作

1. 点击下一步进入基本信息录入页`vehicle-input-bom.html`

### 4.2.2.bom查验`vehicle-input-bom.html`

#### a.页面说明

bom零部件查验申请，可自己添加或删除bom零部件

#### b.相关操作

1. 点击下一步进入基本信息录入页`vehicle-input-tool.html`

### 4.2.3.研发工具安装申请`vehicle-input-tool.html`

#### a.页面说明

研发工具安装申请，可自行添加或删除

#### b.相关操作

1. 点击下一步进入基本信息录入页`vehicle-input-upload.html`

### 4.2.4.上传图片`vehicle-upload.html`

#### a.页面说明

图片上出，数据提交。

#### b.相关操作

1. 数据提交成功后跳转到`新车查验列表`

### 4.3.新车查验`vehicle-input-list.html`

#### a.页面说明

显示所有新录入的车辆

#### b.相关操作

1. 搜索
2. 筛选
3. 查看新车录入信息

### 4.3.1.新车主要信息`vehicle-input-info.html`

显示新录入车辆的主要信息，以及相关操作

### 4.3.2.录入信息修改`vehicle-up-check.html`

修改录入信息。

### 4.3.3.安全检查`vehicle-check-safe.html`

车辆安全检查，填写检查信息。核对检查。

### 4.3.4.线束检查`vehicle-check-wire.html`

### 4.3.5.bom检查`vehicle-check-bom.html`

### 4.3.6.研发工具安装`vehicle-RD-tools.html`

### 4.3.7.审核`vehicl-auditing.html`

### 4.3.8.还车点检`vehicle-check-down.html`

### 4.3.9.添加检查说明`vehicle-check-add-explain.html`

### 4.4.车辆保险`vehicle-insurance-list.html`

### 4.4.1.车辆保险信息`vehicle-insurance-info.html`

### 4.5.车辆牌照`vehicle-license-list.html`

### 4.5.1.车辆牌照信息`vehicle-license-info.html`

### 4.6.筛选`vehicel-filter.html`

### 4.7.搜索`search.html`

### 5.门岗起始页`doorpost.html`

### 5.1.车辆出入管理`doorpost-car-entrance.html`

### 5.2.驾驶员列表`doorpost-driver.html`

### 5.2.1驾驶员信息`doorpost-driver-info.html`

### 5.2.2.驾驶员录入`doorpost-driver-input.html`

### 5.2.3.驾驶员授权`doorpost-driver-authorize.html`

### 6.维修起始页`repair.html`

### 6.1.维修申请`repair-apply.html`

### 6.2.维修列表`repair-list.html`

### 6.2.1.维修信息`repair-info.html`

### 6.2.1.1.保养记录`repair-maintain-info.html`

### 6.2.2.任务分配`repair-allot.html`

### 6.2.3.完成任务`repair-content.html`

### 6.2.4.车辆保养`repair-maintain.html`

### 7.我的`setting.html`
