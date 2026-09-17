import { useState } from 'react';
import { BedDouble, ChevronDown, ExternalLink, MapPin, MapPinned, Plane, WalletCards } from 'lucide-react';

const tabs = ['일정', '관광', '교통', '먹거리', '쇼핑', '예산'] as const;
type Tab = (typeof tabs)[number];
type CardLink = [label: string, href: string];
type CardRow = [title: string, description: string, links?: CardLink[]];
type FoodPlace = { name: string; href: string; note?: string };
type FoodGroup = { menu: string; places: FoodPlace[] };
type FoodRegion = { region: string; groups: FoodGroup[] };

const days = [
  { date: '9/18 금', title: 'DAY 1 · 텐진 / 다이묘', state: '쇼핑 + 야타이', items: [
    ['13:40', '후쿠오카 공항 도착', '입국 수속 → 지하철 → Atlas Apartment 이동'],
    ['16:00', 'Atlas Apartment 체크인', '짐 정리 후 텐진·미나텐진·다이묘 도보권 이동'],
    ['16:30 ~', '텐진 · 미나텐진 · 다이묘 쇼핑', 'Standard Products, GU, BOOK OFF, 몽벨, 주류·카메라 매장'],
    ['저녁', '텐진 야타이', '저녁과 술을 한 자리에서 해결'],
  ]},
  { date: '9/19 토', title: 'DAY 2 · 히타', state: '핵심 원정', items: [
    ['09:00', '니시테츠 텐진 고속버스터미널', '예약 불필요 좌석정원제 · 연휴이므로 일찍 줄서기'],
    ['09:27', '텐진 → 히타', '고속버스 히타호 · 11:00 전후 도착 · 왕복 ¥3,580/인'],
    ['점심', '히타마부시 센야', '10:30~16:30 · LO 15:30 · 2명 예약 불가, 현장 번호표'],
    ['오후', '삿포로 맥주공장', '자유견학 + 테이스팅 · 살롱 10:00~16:30, 주문 마감 16:00 · 흑라벨/에비스 각 ¥450'],
    ['15:20 ~', '琴ひら温泉 유메산스이', '토요일 11:00~21:00 · 최종접수 20:30 · 성인 ¥800 · 밝을 때 계곡 노천탕'],
    ['17:00 ~', '히타 야키소바', '귀환 버스 시간을 보며 저녁'],
    ['18:20', '히타 → 텐진 목표편', '19:50 도착 예상 · 놓치면 19:00 → 20:30 백업 막차'],
    ['비상', '택시 플랜 B', '히타→후쿠오카 약 ¥20,000~25,000+ · 고속도로비 별도 가능'],
  ]},
  { date: '9/20 일', title: 'DAY 3 · 다자이후', state: '역사 + 시내', items: [
    ['오전', '니시테츠 후쿠오카(텐진)역 출발', '니시테츠 전철로 다자이후 이동'],
    ['오전 ~ 점심', '다자이후 텐만구', '참배 · 산도 산책 · 우메가에모치'],
    ['오후', '후쿠오카 귀환', '텐진·나카스 보완 일정과 식사'],
    ['저녁', '후쿠오카 로컬 식당', '저녁과 술은 한 식당에서'],
  ]},
  { date: '9/21 월', title: 'DAY 4 · 미야지다케', state: '축제 + 2차', items: [
    ['10:00 ~ 10:30', '하카타역 출발 목표', 'JR 가고시마 본선 일반/쾌속 · 하카타→후쿠마 약 25분', 'https://m.blog.naver.com/yunni_gongbang/224406531097'],
    ['10:40 ~ 11:10', '후쿠마역 도착', '버스/택시 약 5분 · 도보 약 25분 · 버스 편도 약 ¥210'],
    ['11시대', '미야지다케 신사 도착', '오쿠다리 13시 전후 시작 예상 · 공식 발표 후 분 단위 갱신'],
    ['오후', '미야지다케 축제 관람', '공휴일 혼잡 시 버스 대신 택시 플랜 B'],
    ['복귀', '후쿠마 → 하카타', '출발 직전 Google Maps로 실시간 최적 경로 재검색'],
    ['저녁', '후쿠오카 저녁 + 2차 술집', '이번 여행에서 별도 2차를 잡는 날'],
  ]},
  { date: '9/22 화', title: 'DAY 5 · 후쿠오카성 + 오호리', state: '관광 + 귀국', items: [
    ['10:00', '체크아웃 → Bounce 짐 보관', '텐진역 인근 Tenjin Station North Exit · 앱 예약 · 짐 2개 ¥1,700'],
    ['오전', '후쿠오카성터', '짐 없이 가볍게 마지막 관광'],
    ['점심 ~ 오후', '오호리공원', '산책 · 카페 · 점심'],
    ['오후', '텐진 마지막 쇼핑', '보관 짐 회수 후 공항 이동'],
    ['19:40', '후쿠오카 출발', '여유 있게 공항 도착'],
  ]},
];

const sights: CardRow[] = [
  ['히타', '마메다마치 · 히타마부시 · 삿포로 맥주공장 · 유메산스이 · 히타 야키소바를 하루에 연결'],
  ['다자이후 텐만구', '니시테츠 텐진 출발. 참배와 산도, 우메가에모치까지 묶는 반나절'],
  ['미야지다케 신사', '9/21 공휴일·축제일. 오쿠다리 정확한 시각은 공식 발표 후 확인'],
  ['후쿠오카성터 + 오호리공원', '귀국일 Bounce에 짐을 맡긴 뒤 걷는 마지막 관광 코스'],
];

const transport: CardRow[] = [
  ['공항 ↔ 시내', '후쿠오카 공항 지하철 이용. 컨택리스 결제 가능, 지하철 하루 최대 ¥640 제도 확인.'],
  ['히타', '니시테츠 텐진 고속BT → 히타BT. 토·일·공휴일 시간표, 예약 불가 좌석정원제. 09:27 출발 / 18:20 목표 / 19:00 백업 막차.'],
  ['유메산스이 시내 이동', '히타역·BT에서 차로 약 10분. ひたはしり号 B코스 또는 택시를 일정에 맞춰 사용.'],
  ['다자이후', '니시테츠 후쿠오카(텐진)역 → 다자이후역. 당일 출발 시각에 맞춰 환승 확인.'],
  ['미야지다케', '하카타 → JR 가고시마 본선 → 후쿠마 → 버스/택시. JR도 컨택리스 카드/Apple Pay/Google Pay 터치 가능하며 지하철 ¥640 상한과는 별개.'],
  ['Bounce', '체크아웃 직후 텐진역 북쪽 출구 인근 보관소. 앱 사전예약, 짐 2개 ¥1,700.'],
];

const foodRegions: FoodRegion[] = [
  { region: '후쿠오카 시내', groups: [
    { menu: '라멘', places: [
      { name: '후톤 라멘', href: 'https://www.google.com/maps/search/?api=1&query=후톤+라멘+후쿠오카' },
    ]},
    { menu: '야타이', places: [
      { name: '텐진 야타이', href: 'https://maps.app.goo.gl/Tmv7Fg5UMtbcmsC57?g_st=ic', note: '첫날 저녁 + 술' },
    ]},
    { menu: '야키니쿠', places: [
      { name: '시치린야', href: 'https://maps.app.goo.gl/suXqMW8KbTK43iQ88?g_st=ic', note: '하루요시 1초메' },
      { name: '야키니쿠 아카탄', href: 'https://maps.app.goo.gl/qk9cCrRjVgYUAMMw9?g_st=ic' },
    ]},
    { menu: '사시미', places: [
      { name: '설화(유키하나)', href: 'https://maps.app.goo.gl/QthTzh2mijSMqVjr8?g_st=ic', note: '1순위 · 하루요시 3초메' },
      { name: '카츠카이슈', href: 'https://maps.app.goo.gl/2vRRJpxDYw7cQm2CA?g_st=ic' },
      { name: '카와타로 나카스본점', href: 'https://maps.app.goo.gl/oU4q53zfhJHz5j3z8?g_st=ic', note: '오징어회' },
    ]},
    { menu: '오뎅바', places: [
      { name: '나다이오뎅 야스베', href: 'https://maps.app.goo.gl/tUSkHgRwiMJo4mBcA?g_st=ic', note: '니시나카스' },
      { name: '하츠유키', href: 'https://maps.app.goo.gl/pP8XNsdgj8DSPv1A9?g_st=ic', note: '다이묘' },
    ]},
    { menu: '야키토리', places: [
      { name: '야키토리 마코토짱', href: 'https://maps.app.goo.gl/4Ss65Pa6uev2hGsx7?g_st=ic' },
      { name: '스미게키죠 무사시자', href: 'https://maps.app.goo.gl/55bCDDnmXBCFGSgy7?g_st=ic', note: '원시구이' },
      { name: '토리카와 야키토리 미츠마스 텐진점', href: 'https://maps.app.goo.gl/YEj6pUBptz5kUtqZ8?g_st=ic' },
    ]},
  ]},
  { region: '다자이후', groups: [
    { menu: '명란 와규 덮밥', places: [
      { name: '와규 멘타이코 카구라', href: 'https://maps.app.goo.gl/mqF8uZv2V5J5JWdR9?g_st=ic' },
    ]},
    { menu: '우메가에모치', places: [
      { name: '카사노야', href: 'https://maps.app.goo.gl/frUyhafmzRjgXquV7?g_st=ic', note: '다자이후 산도 간식' },
    ]},
  ]},
  { region: '히타', groups: [
    { menu: '장어', places: [
      { name: '히타마부시 센야', href: 'https://maps.app.goo.gl/AHVgqwTQUHCppUom6?g_st=ic', note: '1순위 · 2명 예약 불가' },
      { name: '이타야 본가(いた屋本家)', href: 'https://maps.app.goo.gl/k6qsSCp5Lnc7Ki4d8', note: '센야 플랜 B · 예약 가능' },
      { name: '우나기 로테이(うなぎ 鷺邸)', href: 'https://maps.app.goo.gl/JW3262CVK4dGuVpLA', note: '강을 보는 고택 분위기' },
    ]},
    { menu: '히타 야키소바', places: [
      { name: '소노다', href: 'https://maps.app.goo.gl/c7R72chbgJNuMpQa9?g_st=ic' },
      { name: '다이가쿠켄', href: 'https://maps.app.goo.gl/aj23Nj4beiYB5FLZ9?g_st=ic' },
      { name: '야키소바 쿠라게(焼きそば くらげ)', href: 'https://maps.app.goo.gl/aAzKUKx1yKcnsQQMA?g_st=ic', note: '포장 전용' },
    ]},
    { menu: '맥주', places: [
      { name: '삿포로 맥주공장 테이스팅 살롱', href: 'https://www.google.com/maps/search/?api=1&query=Sapporo+Beer+Kyushu+Hita+Brewery', note: '주문 마감 16:00 · 흑라벨/에비스 각 ¥450' },
    ]},
  ]},
];

const shops = [
  ['Standard Products', '보냉백 · 여행용품 · 에코백 · 러기지 스트랩', '필요품 우선'], ['GU', '의류 · 이너 · 가벼운 여행복', '사이즈와 면세 확인'], ['BOOK OFF', '중고 의류 · 잡화 · 취미품', '상태 대비 가격 비교'], ['몽벨', '아웃도어 의류 · 소형 여행 장비', '국내가와 비교'], ['빅카메라', '전자제품 · 카메라 액세서리', '쿠폰·면세·보증 조건 확인'], ['LINXAS', '위스키 시세 조사와 실물 확인', '목표가보다 높으면 보류'], ['야마야', '대중적인 주류와 안주', '면세·수하물 한도 확인'], ['Champ de Vin', '와인·위스키 탐색', '희소품 위주'], ['HIGHTIME', '위스키 전문 탐색', '히비키 Blender’s Choice · 야마자키 12 · 조니워커 블루 목표가 비교'], ['카메라의 나니와', '중고 카메라 · 렌즈', '하카타 마루이점 매장 재고 확인'], ['카메라의 키타무라', '중고 카메라 · 렌즈', '온라인 중고가와 현장 상태 비교'], ['Takachiho / 타카치호 텐진', '중고 카메라 구경', '후순위 · 나니와 매장별 재고와 함께 확인'],
];
const shopLinks = [['Naniwa 중고재고','https://www.cameranonaniwa.co.jp/'],['Kitamura 중고','https://shop.kitamura.jp/'],['가격.com 카메라 시세','https://kakaku.com/camera/'],['Yahoo! 옥션 낙찰시세','https://auctions.yahoo.co.jp/closedsearch/closedsearch']];
const budgets = [['확정 숙박비','Atlas Apartment · 4박 / 2인','¥79,834'],['숙박세 예상','¥200 × 2명 × 4박 · 포함 여부 현장 확인','¥1,600'],['Bounce 짐 보관','9/22 · 짐 2개 · 공용 여행경비','¥1,700'],['히타 왕복 버스','¥3,580 × 2명','¥7,160'],['유메산스이','¥800 × 2명','¥1,600'],['삿포로 생맥주','흑라벨/에비스 각 ¥450 기준','현장 선택'],['후쿠마 ↔ 미야지다케 버스','편도 약 ¥210 × 왕복 × 2명','약 ¥840'],['공용비','교통·식사·술·공용지출 목표','¥80,000'],['개인 쇼핑','주류·카메라·의류','별도']];

function Cards({ rows }: { rows: CardRow[] }) { return <div className="cards">{rows.map(([title, desc, links]) => <article className="card" key={title}><h3>{title}</h3><p>{desc}</p>{links && <div className="card-links">{links.map(([label, href]) => <a className="card-link" href={href} target="_blank" rel="noreferrer" key={href}>{label} <ExternalLink size={14}/></a>)}</div>}</article>)}</div>; }

function FoodDirectory() { return <div className="food-regions">{foodRegions.map(({region, groups}) => <section className="food-region" key={region}><div className="food-region-head"><span>AREA</span><h3>{region}</h3></div><div className="food-groups">{groups.map(({menu, places}) => <article className="food-group" key={menu}><div className="food-group-head"><h4>{menu}</h4><span>{places.length > 1 ? `후보 ${places.length}곳` : '1곳'}</span></div><div className="food-options">{places.map(({name, href, note}, index) => <a className="food-option" href={href} target="_blank" rel="noreferrer" key={href}><div>{places.length > 1 && <span className="food-rank">후보 {index + 1}</span>}<strong>{name}</strong>{note && <small>{note}</small>}</div><ExternalLink size={15}/></a>)}</div></article>)}</div></section>)}</div>; }

export default function App() {
  const [tab, setTab] = useState<Tab>('일정'); const [day, setDay] = useState(0); const [hotelOpen, setHotelOpen] = useState(false);
  return <main className="site-shell"><div className="ambient ambient-a"/><div className="ambient ambient-b"/><div className="wrap">
    <header className="hero"><div className="eyebrow">FUKUOKA TRIP PLANNER · <strong>BETA 1.5.2</strong></div><div className="hero-row"><div><h1>후쿠오카<br className="mobile-break"/> 4박 5일</h1><p>2026.09.18 — 09.22 · 남자 둘 · 도시 / 역사 / 축제 / 쇼핑 / 먹거리 / 술</p></div><div className="stamp">九州<br/><span>FUKUOKA</span></div></div>
      <div className="meta-list"><span className="meta"><Plane size={16}/> 9/18 13:40 도착</span><span className="meta"><Plane size={16}/> 9/22 19:40 출발</span><span className="meta"><WalletCards size={16}/> 공용비 ¥80,000</span><button className="meta hotel-trigger" onClick={()=>setHotelOpen(v=>!v)} aria-expanded={hotelOpen}><BedDouble size={16}/> Atlas Apartment · 4박 ¥79,834 <ChevronDown size={15} className={hotelOpen?'rotate':''}/></button></div>
      {hotelOpen && <section className="hotel-panel"><div><span>확정 숙소</span><h2>Atlas Apartment</h2><p><MapPin size={15}/> 후쿠오카시 주오구 다이묘 1초메 1-9</p></div><dl><div><dt>체크인</dt><dd>9/18 16:00</dd></div><div><dt>체크아웃</dt><dd>9/22 10:00</dd></div><div><dt>숙박비</dt><dd>¥79,834 / 2인</dd></div><div><dt>1인 부담</dt><dd>¥39,917</dd></div></dl><p className="hotel-note">Tenjin-Minami역 약 550m · 히타/다자이후는 텐진 출발, 미야지다케는 하카타역 이동</p><a className="link-button" href="https://maps.google.com/?q=1-1-9+Daimyo+Chuo+Ward+Fukuoka" target="_blank" rel="noreferrer">Google Maps <ExternalLink size={15}/></a></section>}
      <a className="saved-map" href="https://maps.app.goo.gl/DgXaRUgMjiE5ZEkS9?g_st=i" target="_blank" rel="noreferrer"><span className="saved-map-icon"><MapPinned size={21}/></span><span className="saved-map-copy"><small>GOOGLE MAPS SAVED LIST</small><strong>후쿠오카 전체 저장 목록</strong><em>관광 · 쇼핑 · 먹거리 한 번에 보기</em></span><ExternalLink className="saved-map-arrow" size={18}/></a>
    </header>
    <nav className="tab-strip" aria-label="메인 메뉴">{tabs.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</nav>
    <section className="content">
      {tab==='일정'&&<><div className="day-strip" aria-label="날짜 선택">{days.map((d,i)=><button key={d.date} className={day===i?'active':''} onClick={()=>setDay(i)}>{d.date}</button>)}</div><div className="section-head"><div><span>ITINERARY {String(day+1).padStart(2,'0')}</span><h2>{days[day].title}</h2></div><em>{days[day].state}</em></div><div className="timeline">{days[day].items.map(([time,place,note,reference])=><article className="timeline-item" key={time+place}><time>{time}</time><div className="dot"/><div><h3>{place}</h3><p>{note}</p>{reference&&<a className="timeline-link" href={reference} target="_blank" rel="noreferrer">미야지다케 가는 법 참고 <ExternalLink size={14}/></a>}</div></article>)}</div></>}
      {tab==='관광'&&<><div className="section-head"><div><span>PLACES</span><h2>관광 포인트</h2></div></div><Cards rows={sights}/></>}{tab==='교통'&&<><div className="section-head"><div><span>TRANSIT</span><h2>교통 상세</h2></div></div><Cards rows={transport}/></>}{tab==='먹거리'&&<><div className="section-head"><div><span>FOOD</span><h2>지역별 먹거리 후보</h2></div></div><FoodDirectory/></>}
      {tab==='쇼핑'&&<><div className="section-head"><div><span>SHOPPING</span><h2>매장별 구매 목록</h2></div></div><div className="responsive-table"><div className="table-head"><span>매장</span><span>아이템</span><span>구매 기준</span></div>{shops.map(([a,b,c])=><div className="table-row" key={a}><div data-label="매장">{a}</div><div data-label="아이템">{b}</div><div data-label="구매 기준">{c}</div></div>)}</div><div className="market-links">{shopLinks.map(([name,href])=><a href={href} target="_blank" rel="noreferrer" key={name}>{name}<ExternalLink size={14}/></a>)}</div></>}
      {tab==='예산'&&<><div className="section-head"><div><span>BUDGET</span><h2>확정·예상 비용</h2></div><em>개인 쇼핑 별도</em></div><div className="budget-summary"><div><span>숙소 확정</span><strong>¥79,834</strong></div><div><span>공용비 목표</span><strong>¥80,000</strong></div><div><span>짐 보관</span><strong>¥1,700</strong></div></div><div className="responsive-table budget-table"><div className="table-head"><span>항목</span><span>산출</span><span>금액</span></div>{budgets.map(([a,b,c])=><div className="table-row" key={a}><div data-label="항목">{a}</div><div data-label="산출">{b}</div><div data-label="금액">{c}</div></div>)}</div></>}
    </section><footer>FUKUOKA TRIP PLANNER · BETA 1.5.2 · 일정과 교통 시각은 여행 당일 공식 안내와 Google Maps로 재확인</footer>
  </div></main>;
}
