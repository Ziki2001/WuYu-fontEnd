## 素拓仓库
***
### 项目运行
```
# npm install 或 yarn(推荐)
# npm run dev
```
### 需求
+ #### 管理员
  可以进行登录操作
  登录后可以对资料进行增删改
+ #### 班级普通成员
  直接可以查看资料
  不能对资料进行增删改
### 目的
将班级素拓材料收集起来，更好地管理材料，方便同学填素拓资料时查找。
### 系统设计
#### 技术栈：
+ 前端`vue2.x` + `Element-ui`
+ 后端`JAVA Spring` + `mySql`
#### 数据：
用户表（user)
| 含义 | 字段名 | 数据类型 | 主键 | 备注 |
| :-----| :---- | :---- | :---- | :---- |
| 用户ID | id | int unsigned | 是 | 自增 |
| 用户名 | user | varchar(32) |  | 唯一索引 |
| 哈希密码 | pwd | char(32) |  | 运算规则 md5(原密码) |
| 学院 | aca | varchar(32) | | 允许NULL |
| 姓名 | name | varchar(32) | | 允许NULL |
| 班级 | class | varchar(32) | | 允许NULL |
| 学号 | num | varchar(32) | | 允许NULL |


五育信息项目表(user_data)
| 含义 | 字段名 | 数据类型 | 主键 | 备注 |
| :-----| :---- | :---- | :---- | :---- |
| 五育项目日期 | date | varchar(10) |  |  |
| 五育类型 | type | varchar(10) |  |  |
| 五育标识 | id | tinyint(4) | 是 | 自增 |
| 五育项目内容 | content | varchar(200) | 是 |  |

