export const interestKeywords = [
  "카페탐방", "맛집", "독서", "음악감상",
  "영화", "운동", "예술", "게임", "요리", "여행",
];

export const topicOptions = [
  { id: "career",   label: "취업·이직 고민",    emoji: "💼" },
  { id: "food",     label: "맛집 추천",          emoji: "🍜" },
  { id: "leisure",  label: "공강·여가 이야기",   emoji: "☕" },
  { id: "interest", label: "요즘 관심사",         emoji: "✨" },
  { id: "free",     label: "아무 주제나 OK",      emoji: "🎲" },
];

// 주제별 밸런스 게임 카드 세트
export const balanceCardsByTopic = {
  career: [
    { id: 1, description: "대기업 vs 스타트업, 지금 선택해야 한다면?", optionA: "대기업 안정", optionB: "스타트업 성장" },
    { id: 2, description: "연봉 5천 워라밸 vs 연봉 1억 야근 필수?", optionA: "워라밸", optionB: "연봉 1억" },
    { id: 3, description: "전공 살리는 취업 vs 전혀 다른 분야 도전?", optionA: "전공 활용", optionB: "새 분야 도전" },
    { id: 4, description: "서울 올라가서 커리어 vs 광주에서 로컬 커리어?", optionA: "서울 커리어", optionB: "광주 로컬" },
    { id: 5, description: "취업 먼저 vs 대학원·자격증 먼저?", optionA: "취업 먼저", optionB: "스펙 먼저" },
    { id: 6, description: "싫은 상사 but 좋은 팀 vs 좋은 상사 but 혼자 일함?", optionA: "좋은 팀", optionB: "좋은 상사" },
    { id: 7, description: "오늘 만난 크루 중 같이 스터디하고 싶은 분 있나요? 👀", optionA: "있어요!", optionB: "아직 모르겠어요" },
  ],
  food: [
    { id: 1, description: "치킨 vs 피자, 하나만 평생 먹어야 한다면?", optionA: "치킨", optionB: "피자" },
    { id: 2, description: "아는 맛집 단골 vs 매번 새 맛집 탐험?", optionA: "단골", optionB: "새 맛집" },
    { id: 3, description: "혼밥 고수 vs 같이 먹어야 맛있다?", optionA: "혼밥 선호", optionB: "함께 먹기" },
    { id: 4, description: "동명동 최고 맛집 고른다면? 카페 vs 밥집?", optionA: "카페", optionB: "밥집" },
    { id: 5, description: "매운 거 vs 단 거, 하나만 먹을 수 있다면?", optionA: "매운 거", optionB: "단 거" },
    { id: 6, description: "배달 vs 외식, 평소 점심은?", optionA: "배달", optionB: "외식" },
    { id: 7, description: "오늘 식사 어떠셨나요? 다음엔 어디 가고 싶어요? 👀", optionA: "여기 또!", optionB: "새 곳 가보자" },
  ],
  leisure: [
    { id: 1, description: "공강 시간, 카페 vs 도서관?", optionA: "카페", optionB: "도서관" },
    { id: 2, description: "주말 계획 있는 사람 vs 즉흥으로 사는 사람?", optionA: "계획파", optionB: "즉흥파" },
    { id: 3, description: "혼자 노는 거 vs 친구랑 노는 거, 솔직히?", optionA: "혼자가 좋아", optionB: "같이가 좋아" },
    { id: 4, description: "SNS 없이 1주일 vs 스마트폰 없이 하루?", optionA: "SNS 끊기", optionB: "스마트폰 끊기" },
    { id: 5, description: "여가에 뭔가 배우기 vs 그냥 쉬기?", optionA: "배우기", optionB: "그냥 쉬기" },
    { id: 6, description: "동명동 골목 산책 vs 집에서 넷플릭스?", optionA: "산책", optionB: "넷플릭스" },
    { id: 7, description: "오늘 만난 크루랑 다음 주 또 놀고 싶다?", optionA: "좋아요!", optionB: "천천히요~" },
  ],
  interest: [
    { id: 1, description: "요즘 가장 꽂혀있는 게 뭔지 한 마디로?", optionA: "AI·기술", optionB: "문화·예술" },
    { id: 2, description: "유튜브 알고리즘이 나를 어디로 데려가?", optionA: "지식·정보", optionB: "예능·음악" },
    { id: 3, description: "새로운 관심사 생겼을 때, 바로 깊이 파기 vs 가볍게 즐기기?", optionA: "깊이 파기", optionB: "가볍게 즐기기" },
    { id: 4, description: "사이드 프로젝트 하나 시작한다면?", optionA: "앱·콘텐츠 만들기", optionB: "배움·취미 클래스" },
    { id: 5, description: "트렌드 빠르게 따라가기 vs 나만의 페이스?", optionA: "트렌드 팔로우", optionB: "내 페이스" },
    { id: 6, description: "요즘 관심사, 주변에 말하기 vs 혼자 즐기기?", optionA: "공유하기", optionB: "혼자 즐기기" },
    { id: 7, description: "오늘 대화 중 새로 알게 된 것, 한 가지만? 👀", optionA: "엄청 많아요!", optionB: "아직 탐색 중" },
  ],
  free: [
    { id: 1, description: "치킨 vs 피자, 하나만 먹어야 한다면?", optionA: "치킨", optionB: "피자" },
    { id: 2, description: "공강에 혼자 카페 vs 도서관, 어디 가요?", optionA: "카페", optionB: "도서관" },
    { id: 3, description: "SNS 없이 1주일 vs 스마트폰 없이 하루?", optionA: "SNS 끊기", optionB: "스마트폰 끊기" },
    { id: 4, description: "아는 맛집 단골 vs 매번 새 맛집 탐험?", optionA: "단골", optionB: "새 맛집" },
    { id: 5, description: "취업 후 서울 vs 광주, 어디서 살고 싶어요?", optionA: "서울", optionB: "광주" },
    { id: 6, description: "점심 혼밥 vs 같이 먹기, 평소엔?", optionA: "혼밥", optionB: "같이 먹기" },
    { id: 7, description: "오늘 만난 크루, 다음에 또 보고 싶은 분 있나요? 👀", optionA: "있어요!", optionB: "천천히요~" },
  ],
};
