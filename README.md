<div align="center" style="font-size:12pt">

<img alt="Geulida" src="https://github.com/Geulida/Geulida-front/assets/125162787/e7269260-c1c2-4770-bc18-bebf42ef3da0" width="800">
  
### 그리다(Geulida)

<img src="https://img.shields.io/badge/2023.05.08~2023.05.28(기획,구현)-8085CC?style=flat-square&logoColor=white"/>
<br />
<img src="https://img.shields.io/badge/2023.06.27~2023.06.28(리팩토링)-8085CC?style=flat-square&logoColor=white"/> <br/>

### 🎨 당신의 하루를 그려드립니다.

openAI를 활용하여 유저가 선호하는 색상과 화풍,<br/>
그리고 그 날 유저의 감정을 읽고 그림으로 그려주는 웹서비스, <b>그리다</b>입니다.
</div>

## 서비스 기능
- 로그인/회원가입
- 원하는 색상, 화풍리스트 선택
- OpenAI의 Davinci-003 모델의 상담사 AI와 대화
- DALL-E 모델로 상담 요약문, 유저가 선택한 색상과 화풍 기반의 이미지 생성
- 이미지 결과 생성, 콜렉션 저장, 카카오톡 공유
- 유저가 생성한 이미지 리스트 조회, 삭제

  <br />
## 기획 & 설계
### 서비스 플로우
<div align="center">
<img width="1737" alt="Service-Flow" src="https://github.com/Geulida/Geulida-front/assets/125162787/8f0a62f9-2444-4a6a-acb4-692ec2a75a26">
</div>

### 와이어 프레임
<div align="center">
<img alt="Wireframe" src="https://github.com/Geulida/Geulida-front/assets/125162787/78fa634e-6764-4a28-b0a5-3359c9b7ff73">
</div>
  <br />
  
## 기능 구현
### API 문서
  https://documenter.getpostman.com/view/26758081/2s93kxd6qs#27b7f42a-5755-49ca-a67a-eb2c6d1da442
### 기능별 데모 영상
  <div align="center">
  <b>회원가입, 로그인</b> <br /><br />
    <img alt="Sign-Up&Log-In" src="https://github.com/Geulida/Geulida-front/assets/125162787/e19edbe0-5c58-4e71-b34e-05dc790585aa">
    <br /><br />
  <b>채팅 기능</b><br /><br />
    <img alt="Chat" src="https://github.com/Geulida/Geulida-front/assets/125162787/106e2d88-5e44-4ece-bc30-210c15f01ddc">
    <br /><br />
  <b>이미지 생성</b><br /><br />
    <img alt="Create Image" src="https://github.com/Geulida/Geulida-front/assets/125162787/4101d5fd-b9ea-4881-b53d-16439d177124">
    <br /><br />
  <b>콜렉션</b><br /><br />
    <img alt="Collection" src="https://github.com/Geulida/Geulida-front/assets/125162787/40cf1c98-24c3-4b68-bd1e-30907eab9fc5"> <br />
  </div>
  <br />
  
## 기술스택
|**Tech Stack**|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------ | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **Frontend** | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"> |
| **Backend**  |                                                                                                                                                                                                                   <img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/JWT-00B5E2?style=for-the-badge&logo=jsonwebtokens&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white">                                                                                                                                                                                                                    |
| **DB**       |                                                                                                                                                                                                                                                                        <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">                                                                                                                                                                                                                                                                         |
| **Others**   |                                                                                                               <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                                |
  <br />
  
## 프로젝트 멤버 소개
<table width="1000" align="center">
    <thead>
    </thead>
    <tbody>
    <tr>
        <th>이름</th>
        <td width="100" align="center">신하영</td>
        <td width="100" align="center">신혜지</td>
        <td width="100" align="center">이채연</td>
        <td width="100" align="center">김승환</td>
        <td width="100" align="center">김지우</td>
        <td width="100" align="center">탁경진</td>
    </tr>
    <tr>
        <th>역할</th>
        <td width="150" align="center">
            FE
        </td>
        <td width="150" align="center">
            FE
        </td>
        <td width="150" align="center">
            FE
        </td>
         <td width="150" align="center">
            BE
        </td>
         <td width="150" align="center">
            BE
        </td>
         <td width="150" align="center">
            BE
        </td>
    </tr>
        <tr>
        <th>담당</th>
         <td width="100" align="center">
                색상 팔레트 선택, 화풍 선택, 결과 페이지 구현 / 갤러리 저장 API 연동 / 카카오톡 공유
            </a>
        </td>
        <td width="100" align="center">
                채팅 페이지 / 채팅 API 및 이미지 생성 API 연동 / 네비게이션 컴포넌트
            </a>
        </td>
        <td width="100" align="center">
               로그인, 회원가입, 콜렉션 페이지 구현 / 로그인 및 회원가입, 콜렉션 API 연동 / 레이아웃 css
            </a>
        </td>
        <td width="100" align="center">
               컬렉션 API / 에러 및 유효성검증 미들웨어 API / 에러처리시 AppError 상속
            </a>
        </td>
        <td width="100" align="center">
               채팅 생성 API, 이미지 생성 API / 클라우드 이미지 저장 및 퍼블릭 URL 생성 / 서버 배포
            </a>
        </td>
        <td width="100" align="center">
              로그인 API, 회원가입 API
            </a>
        </td>
    </tr>
    <tr>
        <th>GitHub</th>
        <td width="100" align="center">
            <a href="https://github.com/Hayeong8957">
                <img src="http://img.shields.io/badge/Hayeong8957-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="">
                <img src="http://img.shields.io/badge/혜지-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/gwanseeum">  
                <img src="http://img.shields.io/badge/gwanseeum-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/sh5080">
                <img src="http://img.shields.io/badge/sh5080-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/ziuss76">
                <img src="http://img.shields.io/badge/ziuss76-green?style=social&logo=github"/>
            </a>
        </td>
         <td width="100" align="center">
            <a href="">
                <img src="http://img.shields.io/badge/경진님-green?style=social&logo=github"/>
            </a>
          </td>
    </tr>
    </tbody>
</table>
<br>
