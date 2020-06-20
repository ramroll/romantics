# 数据类型和基本操作

## 基础类型
- void 空类型 
- bool 布尔
- int 整数
- float 浮点

## 向量
- vec2 2d单精度浮点向量
- vec3 3d单精度浮点向量
- vec4 4d单精度浮点向量
- bvec2 2d布尔向量
- bvec3 3d布尔向量
- bvec4 4d布尔向量
- ivec2 2d整数向量
- ivec3 3d整数向量
- ivec4 4d整数向量

### 向量操作

相同维度的向量可以相加
```
vec2 a = vec2(1.0, 2.0);
vec2 b = vec2(3.0, 4.0);
vec2 c = a + b;
// c = (4.0, 6.0) 
```

可以通过`xyzw`获取向量中的值
```
vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

vec3 b = a.xyz;
// b = (1.0, 2.0, 3.0)

vec2 c = a.xw;
// c = (1.0, 4.0)

vec4 d = a.xyxx;
// d = (1.0, 2.0, 1.0, 1.0)
```

`rgba`和`xyzw`拥有同样的能力
```
vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

vec4 d = a.rgrr;
// d = (1.0, 2.0, 1.0, 1.0) 
```

`stpq`也拥有这个能力
```
vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

vec4 d = a.stss;
// d = (1.0, 2.0, 1.0, 1.0) 
```

## 矩阵

- mat2 2*2矩阵
- mat3 3*3矩阵
- mat4 4*4矩阵
- matnxm m行n列的矩阵(思考：为什么之前给glsl的矩阵我们都转置)


### 矩阵操作
初始化
```
mat3 a;
a[0] = vec3(1.0, 2.0, 3.0);
a[1][1] = 10.0;
a[2].yzx = vec3(1.0, 2.0, 3.0);


```

### 矩阵构造器
```
mat3 b = mat3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);

mat2(float, float, float, float);

mat3(vec3, vec3, vec3);

mat3(
  vec2, float,
  vec2, float,
  vec2, float
);
```

## 外部类型

有一些外部定义的类型会创建外部对象的引用。

- Sampler
每个Sampler代表了一种材质。

- Image
代表一张图片。

## 数组

```
uniform float arr[8];
uniform vec3 arr[5][2];
```

## 结构体

```
struct Light
{
  vec3 eyePosOrDir;
  bool isDirectional;
  vec3 intensity;
  float attenuation;
} foo;
```
上面代码创造了一个结构体类型`Light`，并且定义了一个变量`foo`属于结构体类型`Light`

```
struct Data
{
  float first;
  vec2 second;
};

Data dataValue = Data(1.4, vec2(16.0, 22.5));
```
上面演示了结构体构造过程。

## 类型严格

这样的写法会报错
```
int a = 3.0;
float a = 2;
```

## 操作符
与C系基本一致

## 控制语句
```
if,while,for与C一致
```


## 函数
```
void MyFunction(in float inputValue, out int outputValue, inout float inAndOutValue);

```

- in 输入(会将外部变量值拷贝进函数)
- out 输出(调用完成会将值拷贝到外部变量)
- inout (拷贝两次)


### 函数递归
不支持


# 存储限定符 

存储限定符(storage qualifier)，用来描述变量如何被glsl存储。

## uniform

一种全局着色器变量，用于从程序向着色器传递参数。`unifrom`的意思就是在所有的着色器调用中值保持一致。

```
struct TheStruct
{
  vec3 first;
  vec4 second;
  mat4x3 third;
};

uniform vec3 oneUniform;
uniform TheStruct aUniformOfArrayType;
uniform mat4 matrixArrayUniform[25];
uniform TheStruct uniformArrayOfStructs[10];
```
uniform是一种常数，但是用户可以设置它的初始值。
```
uniform vec3 initialUniform = vec3(1.0, 0.0, 0.0);
```


## attribute

仅仅可以在顶点着色器中使用, 用来存储顶点相关的数据。


## varying

在顶点着色器中定义，然后传给片段着色器的变量。