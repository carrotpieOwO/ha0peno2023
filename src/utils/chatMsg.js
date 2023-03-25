
import EmailForm from "../components/EmailForm";

const chatMsg = [
    {
      id: 'greeting',
      message: '안녕하세요! 🤗 제 포트폴리오를 봐주셔서 감사해요!',
      trigger: 'question',
    },
    {
        id: 'question',
        message: '궁금하신 점이 있으신가요?',
        trigger: 'question-option',
    },
    {
        id: 're-question',
        message: '더 궁금하신 점이 있으신가요?',
        trigger: 'question-option',
    },
    {
        id: 'question-option',
        options: [
          { value: true, label: '네!', trigger: 'yes' },
          { value: false, label: '아니요', trigger: 'no' },
        ],
    },
    {
        id: 'yes',
        message: '좋습니다 👍🏻',
        trigger: 'yes2',
    },
    {
        id: 'yes2',
        message: '어떤 점이 궁금하신 가요?',
        trigger: 'yes-option',
    },
    {
      id: 'yes-option',
      options: [
        { value: 7, label: '깃헙주소', trigger: 'github' },
        { value: 8, label: '이력서', trigger: 'resume' },
        { value: 9, label: '뭘로 만들어진거야?', trigger: 'portfolio'},
        { value: 10, label: '기타', trigger: 'etc'},
      ],
    },
    {
        id: 'github',        
        message: '제 깃헙으로 안내해드리겠습니다!',
        trigger: 'github-redirect'
    },
    {
        id: 'github-redirect',        
        message: '제 깃헙은 잘 보고 오셨나요?',
        trigger: () => {
            window.open('https://github.com/carrotpieOwO', "_blank"); 
            return 're-question'
        },
    },
    {
        id: 'resume',
        message: '제 이력서로 안내해드리겠습니다!',
        trigger: 'resume-redirect'
    },
    {
        id: 'resume-redirect',
        message: '제 이력서는 어떠셨나요?',
        trigger: () => {
            window.open('https://inky-cloud-bda.notion.site/8692ead489654e929a03f4b39c12af36', "_blank"); 
            return 're-question'
        },
    },
    {
        id: 'portfolio',
        message: '이 페이지는 React로 구현되어 있으며,',
        trigger: 'portfolio-style',
    },
    {
        id: 'portfolio-style',
        message: 'styled-components를 사용하여 스타일링을 하였습니다.',
        trigger: 'portfolio-motion',
    },
    {
        id: 'portfolio-motion',
        message: '또한 framer-motion 라이브러리를 이용하여 모션을 추가하였고,',
        trigger: 'portfolio-three',
    },
    {
        id: 'portfolio-three',
        message: 'three.js를 이용하여 3D 그래픽을 구현하였습니다.',
        trigger: 're-question',
    },
    {
        id: 'etc',
        message: '더 궁금하거나 하고싶은 이야기가 있으시다면 아래 항목들을 입력하여 전송해주세요!',
        trigger: 'email-form',
    },
    {
        id: 'email-form',
        component: <EmailForm />,
        waitAction: true,
        trigger: ({value}) => {
            if (value === 'email-success') {
                return 'email-success'
            } else if (value === 'email-cancel') {
                return 'email-cancel'
            } else {
                return 'email-fail'
            }
        },
    },
    {
        id: 'email-success',
        message: '이메일이 전송되었습니다!',
        trigger: 'email-response',
    },
    {
        id: 'email-response',
        message: '최대한 빨리 연락드리겠습니다😎',
        trigger: 're-question',
    },
    {
        id: 'email-fail',
        message: '이메일이 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
        trigger: 're-question',
    },
    {
        id: 'email-cancel',
        message: '궁금한 점이 정리되면 다시 연락주세요! :)',
        trigger: 're-question',
    },
    {
        id: 'no',
        message: '네! 봐주셔서 감사합니다 🤗',
        trigger: 'end'
    },
    {
        id: 'end',
        message: '좋은 하루 보내세요!',
        end: true,
    }
]

export default chatMsg;