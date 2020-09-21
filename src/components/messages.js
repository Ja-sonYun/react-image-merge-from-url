export const ALL_STEP = 5;

// MESSAGE ( c=null , l=null )

// Progress Messages
export const FINDING_IMG = () => { return {
	ko: 'url에서 이미지 찾는중...',
	en: 'Finding images from given url...', step:1}
};
export const IMGS_FOUND = (c) => { return {
	ko: c + '개의 이미지 발견. 메타데이터 수집중...',
	en: c + ' images found. Start to get metadatas...', step:2}
};
export const PP_BACK = () => { return {
	ko: '배경 이미지 준비중...',
	en: 'Preparing background image...', step:3 }
};
export const GETTING_IMG = (c, l) => { return {
	ko: 'url 에서 이미지 다운로드중...(' + c + '/' + l + ')',
	en: 'Getting image from url...(' + c + '/' + l + ')', step:3+c }
};
export const START_MERGE = (c) => { return {
	ko: '완료! 이미지 합치는중...',
	en: 'Done! Starting merge...', step:4+c }
};
export const DISPLAYING = (c) => { return {
	ko: '이미지 표시중...',
	en: 'Displaying image...', step:5+c }
};
export const ALL_DONE = (c) => { return {
	ko: '완료!',
	en: 'All done!', step:6+c }
};

// Error Messages
export const SOMETHING_WRONG = () => { return {
	ko: '에러! 다시시도해주세요.',
	en: 'Something wrong!', step:-1 }
};
export const WRONG_URL = () => { return {
	ko: '정확한 url을 입력해주세요.',
	en: 'Please enter a correct url.', step:-1 }
};
export const IMG_NOT_FOUND = ()=> { return {
	ko: '주어진 url에서 이미지를 발견할수 없엇습니다.',
	en: 'Image not found from given url...', step:-1 }
};

// 2 means the previous stpes
export function getEndPoint(a) {
	return a + 6;
}

export function setLan(set) {
	console.log(set)
}
