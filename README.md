# parcel-typescript-redux

typescript-redux with parcel

> 이 프로젝트는 노마트코드의 **_초보자를 위한 리덕스 101_** 을 보고 parcel, typescript로 변경하여 따라한 내용입니다.

## 프로젝트 환경설정

1. github repository 생성 parcel-typescript-redux
2. local pc에서 프로젝트가 생성될 폴더에서 git clone https://github.com/antnf3/parcel-typescript-redux.git 실행
3. yarn init
4. git add .
5. git commit -m "first init"
6. git push origin master

## parcel 설치

```shell
> yarn global add parcel-bundler
```

## parcel에서 typescript 타입체크 할 수 있도록 설정

```shell
> touch tsconfig.json

{
  "include": ["src"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "noImplicitAny": true,
    "target": "es5"
  }
}
```

## redux 설치

```shell
$ yarn add redux
```
