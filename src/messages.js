export const ALL_STEP = 5;

// MESSAGE ( c=null , l=null )

// Progress Messages
export const FINDING_IMG = () => { return {
	ko: 'url에서 이미지 찾는중...',
	jp: 'urlからイメージ探索中...',
	en: 'Finding images from given url...', step:1}
};
export const IMGS_FOUND = (c) => { return {
	ko: c + '개의 이미지 발견. 메타데이터 수집중...',
	jp: c + ' イメージ発見。メタデータ取集中...',
	en: c + ' images found. Start to get metadatas...', step:2}
};
export const PP_BACK = () => { return {
	ko: '배경 이미지 준비중...',
	jp: 'バックグラウンドイメージ作成中...',
	en: 'Preparing background image...', step:3 }
};
export const GETTING_IMG = (c, l) => { return {
	ko: 'url 에서 이미지 다운로드중...(' + c + '/' + l + ')',
	jp: 'urlからイメージダウンロード中...(' + c + '/' + l + ')',
	en: 'Getting image from url...(' + c + '/' + l + ')', step:3+c }
};
export const START_MERGE = (c) => { return {
	ko: '완료! 이미지 합치는중...',
	jp: '成功！イメージ合成中...',
	en: 'Done! Starting merge...', step:4+c }
};
export const DISPLAYING = (c) => { return {
	ko: '이미지 표시중...',
	jp: 'イメージロード中...',
	en: 'Displaying image...', step:5+c }
};
export const ALL_DONE = (c) => { return {
	ko: '완료!',
	jp: '成功！',
	en: 'All done!', step:6+c }
};

// Error Messages
export const SOMETHING_WRONG = () => { return {
	ko: '에러! 다시시도해주세요.',
	jp: 'エラ！',
	en: 'Something wrong!', step:-1 }
};
export const WRONG_URL = () => { return {
	ko: '정확한 url을 입력해주세요.',
	jp: '正しいurlを入力してください。',
	en: 'Please enter a correct url.', step:-1 }
};
export const IMG_NOT_FOUND = ()=> { return {
	ko: '주어진 url에서 이미지를 발견할수 없엇습니다.',
	jp: 'urlからイメージを発見できませんでした。',
	en: 'Image not found from given url...', step:-1 }
};


// LAYOUT
export const ENTER_URL_HERE = () => { return {
	ko: '이곳에 url을 입력해 주세요...',
	jp: 'URLを入力してください。',
	en: 'Enter URL here...', }
};

export const MERGE_M = () => { return {
	ko: '합치기',
	jp: 'Merge',
	en: 'Merge', }
};

export const DESCRIPTION = () => { return {
	ko: 'URL을 입력하시면 해당 URL에 있는 모든이미지를 다운로드하여 한장의 이미지로 합쳐줍니다.',
	jp: 'URLを入力すると、そのURLから全てのイメージをダウンロードし、一枚のイメージに合成します。',
	en: 'Just put the url. This website will automatically download all images from given url and merge them as an one image file.', }
};

// 2 means the previous stpes
export function getEndPoint(a) {
	return a + 6;
}

export function setLan(set) {
	console.log(set)
}
