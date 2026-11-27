// モモンガが食べられない危険な食材データベース

// デバッグログ
console.log('app.js読み込み開始');
console.log('Tesseract.js準備状態:', window.tesseractReady);
console.log('Tesseract オブジェクト:', typeof Tesseract !== 'undefined' ? 'OK' : 'NOT FOUND');

let currentImage = null;
let currentPreviewUrl = null;

// ...existing code...
const DANGEROUS_FOODS = {
    // 絶対NG
    fatal: [
        'チョコレート', 'チョコ', 'ココア', 'カカオ','カカオマス','カカオバター','カカオ豆', 'cacao', 'chocolate', 'cocoa','cocoa mass','cocoa butter','cocoa bean',
        'コーヒー', 'カフェイン','コーヒー豆','コーヒーエキス','coffee','caffeine','coffee bean','coffee extract',
        'アルコール', 'エタノール', '酒', 'alcohol', 'ethanol',
        '紅茶', '緑茶', 'ウーロン茶','抹茶', 'tea', 'green tea', 'oolong tea', 'matcha',
        '玉ねぎ', 'たまねぎ', 'たまねぎエキス','オニオンパウダー', 'onion','onion extract','onion powder',
        'ネギ', 'ねぎ', '長ネギ', '長ねぎ','白ねぎ','青ねぎ','green onion', 'leek','spring onion','scallion','white onion',
        'ニンニク', 'にんにく','にんにくエキス','ガーリックエキス', 'ガーリック','ガーリックパウダー', 'garlic','garlic powder','garlic extract',
        'アボカド','アボカドペースト','アボカドパウダー', 'avocado','avocado paste','avocado powder',
        'キシリトール','白華糖', 'xylitol','xylitol powder','xylitol extract','birch sugar','birch sugar powder','birch sugar extract',
        'ニラ', 'にら', '韮','chive',
        'らっきょう', 'ラッキョウ',
        'エシャロット', 'shallot',
        'ブドウ', '葡萄', 'ぶどう', 'grape', 'レーズン', 'raisin',
        'マカダミア', 'macadamia',
        'りんご種子','りんごの種','アップルシード','りんご種子エキス','apple seed','apple seed extract',
        'びわ種子','びわの種','ビワ種子','びわ種粉末','loquat seed',
        'ライム', 'lime',
        'アボカド','アボカド種子','アボカドの種','アボカドシード','avocado seed','avocado',
        'チャイブ','リーキ','わけぎ', 'chive','leek','welsh onion',
    ],

    // 注意喚起リスト（未定義だとエラーになるため空配列で初期化）
    caution: []
};
// ...existing code...

// 少量なら食べられる食材
const LIMITED_FOODS = [
    'りんご', 'リンゴ', '林檎', 'apple',
    'バナナ', 'banana',
    'みかん', 'ミカン', '蜜柑', '橘', 'tangerine', 'mandarin',
    'ぶどう', '葡萄', 'ブドウ', 'grape',
    'オレンジ', '橙', 'オレンジ果汁', 'orange',
    'キウイ', 'キウイフルーツ', 'kiwi',
    'パイナップル', 'パイン', 'pineapple',
    'マンゴー', 'mango',
    'パパイヤ', 'papaya',
    'メロン', 'melon',  
    'スイカ', '西瓜', 'watermelon',
    'ラズベリー', 'raspberry',
    'ブラックベリー', 'blackberry',
    'クランベリー', 'cranberry',
    'アセロラ', 'acerola',
    'グレープフルーツ', 'grapefruit',
    'レモン', '檸檬', 'lemon',
    'ブルーベリー', 'blueberry',
    'いちご', 'イチゴ', '苺', 'strawberry',
    'さくらんぼ', 'サクランボ', '桜桃', 'cherry',
    'パッションフルーツ', 'passion fruit',
    'ザクロ', 'ざくろ', '石榴', 'pomegranate',
    'アプリコット', '杏', 'apricot',
    'プラム', 'すもも', 'スモモ', 'plum',
    'ネクタリン', 'nectarine',
    'カシス', 'カシス果汁', 'cassis', 'blackcurrant',
    'キャベツ', 'cabbage',
    'にんじん', '人参', 'carrot',
    'かぼちゃ', 'カボチャ', 'pumpkin',
    '小松菜', 'こまつな', 'komatsuna',
    'ほうれん草', 'ホウレンソウ', 'spinach',
    'ブロッコリー', 'broccoli',
    'チンゲンサイ', '青梗菜', 'chinese cabbage',
    'トマト', 'トマト', 'tomato',
    'さつまいも', 'サツマイモ', '薩摩芋', 'sweet potato',
    '枝豆', 'えだまめ', 'edamame',
    'トマト', 'tomato',
    'ビーツ', 'beetroot',
    '梨', 'ナシ', 'なし', 'pear',
    '桃', 'もも', 'モモ', 'peach',
    'イチジク', 'いちじく', 'fig',
    '柿', 'かき', 'カキ', 'persimmon',
    'レタス', 'lettuce',
    'コラードグリーン', 'collard greens',
    'ズッキーニ', 'zucchini',
    'アーモンド', 'almond',
    'くるみ', '胡桃', 'クルミ', 'walnut',
    'ピスタチオ', 'pistachio',
    'カシューナッツ', 'cashew nut',
    'ヘーゼルナッツ', 'hazelnut',
    'マカダミアナッツ', 'macadamia nut',
    'ピーナッツ', '落花生', 'peanut',
    'ひまわりの種', 'sunflower seed',
    'あんず', '杏', 'apricot',

];

// DOM要素
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removeImage = document.getElementById('removeImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultSection = document.getElementById('resultSection');
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const dangerousSection = document.getElementById('dangerousSection');
const dangerousList = document.getElementById('dangerousList');
const safeSection = document.getElementById('safeSection');
const safeList = document.getElementById('safeList');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingStatus = document.getElementById('loadingStatus');

// 手動入力関連
const manualInputSection = document.getElementById('manualInputSection');
const manualTextInput = document.getElementById('manualTextInput');
const manualAnalyzeBtn = document.getElementById('manualAnalyzeBtn');

// ドラッグ＆ドロップイベント
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

        

// ファイル選択イベント
function openFilePicker() {
    if (!fileInput) return;
    fileInput.value = '';
    fileInput.click();
}

uploadArea.addEventListener('click', (e) => {
    if (e.target.closest('.file-label')) {
        e.preventDefault();
        e.stopPropagation();
        openFilePicker();
        return;
    }

    if (e.target === uploadArea) {
        e.preventDefault();
        openFilePicker();
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// 画像削除
removeImage.addEventListener('click', () => {
    resetUpload();
});

// 解析ボタン
analyzeBtn.addEventListener('click', analyzeImage);

// 手動入力ボタンイベント
manualAnalyzeBtn.addEventListener('click', () => {
    const manualText = manualTextInput.value.trim();
    if (!manualText) {
        alert('テキストを入力してください');
        return;
    }
    console.log('手動入力テキスト解析開始:', manualText);
    // 前の画像をクリア
    resetUpload();
    // テキストを解析
    analyzeText(manualText);
});

// ファイル処理
function handleFile(file) {
    console.log('handleFile called with', file && file.name);
    if (!file || !file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください');
        return;
    }

    if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
    }

    currentPreviewUrl = URL.createObjectURL(file);
    previewImage.src = currentPreviewUrl;

    const reader = new FileReader();
    reader.onload = (e) => {
        console.log('file loaded');
        if (currentImage) console.log('currentImage will be overwritten');
        currentImage = e.target.result;
        uploadArea.style.display = 'none';
        previewContainer.classList.add('active');
        analyzeBtn.disabled = false;
        resultSection.classList.remove('active');
    };
    reader.onerror = () => {
        currentImage = null;
        previewImage.src = '';
        alert('画像を読み込めませんでした。別の画像をお試しください。');
    };
    reader.readAsDataURL(file);
}

// リセット
function resetUpload() {
    if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
        currentPreviewUrl = null;
    }
    currentImage = null;
    previewImage.src = '';
    uploadArea.style.display = 'block';
    previewContainer.classList.remove('active');
    analyzeBtn.disabled = true;
    fileInput.value = '';
}

// OCR用に画像を縮小・最適化・強調処理する
async function prepareImageForOCR(imageSrc) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // 高解像度で処理
            const maxDimension = 3000;
            let { width, height } = img;
            
            // アスペクト比を保持したまま最大寸法を適用
            const scale = Math.min(1, maxDimension / Math.max(width, height));
            width = Math.round(width * scale);
            height = Math.round(height * scale);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, width, height);

            // ステップ1: ImageData を取得
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            console.log('画像処理開始。寸法:', width, 'x', height);

            // ステップ2: 強力なコントラスト強調 + グレースケール化
            const processPixel = (r, g, b) => {
                // RGB→グレースケール（加重平均）
                let gray = r * 0.299 + g * 0.587 + b * 0.114;
                
                // ステップA: 中央値を中心にコントラスト強調
                const center = 128;
                const contrast = 3.0; // 強力なコントラスト
                gray = (gray - center) * contrast + center;
                
                // ステップB: クリッピング
                gray = Math.max(0, Math.min(255, gray));
                
                // ステップC: さらに強いバイナリ化（テキスト向け）
                // グレースケール領域（110-146）は明確に分離
                if (gray > 200) {
                    gray = 255; // 白
                } else if (gray < 80) {
                    gray = 0;   // 黒
                } else if (gray > 145) {
                    gray = 255; // グレー上部→白
                } else if (gray < 110) {
                    gray = 0;   // グレー下部→黒
                } else {
                    // グレー中央部もより明確に
                    gray = gray > 127 ? 200 : 55;
                }
                
                return gray;
            };

            // ピクセル処理
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                const gray = processPixel(r, g, b);
                
                data[i] = gray;     // R
                data[i + 1] = gray; // G
                data[i + 2] = gray; // B
                // data[i + 3] = alpha (変更なし)
            }

            ctx.putImageData(imageData, 0, 0);

            // ステップ3: シャープネス向上フィルタ（オプション）
            // 別キャンバスで出力
            const outputCanvas = document.createElement('canvas');
            outputCanvas.width = width;
            outputCanvas.height = height;
            const outputCtx = outputCanvas.getContext('2d');
            outputCtx.drawImage(canvas, 0, 0);

            // PNG形式で出力（品質損失なし）
            const result = outputCanvas.toDataURL('image/png');
            
            console.log('画像処理完了。出力サイズ:', result.length, 'bytes');
            
            resolve(result);
        };
        img.onerror = (e) => {
            console.error('画像読み込みエラー:', e);
            reject(new Error('OCR用画像読み込みに失敗しました'));
        };
        img.src = imageSrc;
    });
}

// 画像解析
async function analyzeImage() {
    if (!currentImage) return;

    console.log('===== 解析開始 =====');
    console.log('currentImage存在:', !!currentImage);
    console.log('currentImage長さ:', currentImage.length);

    // Tesseract.jsが利用可能かチェック
    const tesseractAvailable = (typeof Tesseract !== 'undefined');
    console.log('Tesseract.js利用可能:', tesseractAvailable);
    
    if (!tesseractAvailable) {
        alert('Tesseract.jsが読み込まれていません。ページをリロードしてください。');
        return;
    }
    
    const TESS = Tesseract;
    console.log('Tesseract.js取得成功:', !!TESS);

    // ローディング表示
    loadingOverlay.classList.add('active');
    analyzeBtn.classList.add('loading');
    analyzeBtn.disabled = true;

    let worker;
    try {
        loadingStatus.textContent = 'OCRエンジンを初期化中...';
        console.log('ワーカー作成開始');
        
        // Tesseract.js v5用の初期化
        // コアライブラリのURLを明示的に指定
        console.log('ワーカー作成: jpn言語');
        worker = await Tesseract.createWorker('jpn');
        console.log('ワーカー作成完了');

        loadingStatus.textContent = '言語データを読み込み中...';
        console.log('言語データ読み込み開始');
        
        await worker.loadLanguage('jpn');
        console.log('jpn言語データ読み込み完了');
        
        await worker.initialize('jpn');
        console.log('jpn初期化完了');

        loadingStatus.textContent = 'OCR用に画像を最適化しています...';
        console.log('画像最適化開始');
        
        const ocrImage = await prepareImageForOCR(currentImage);
        console.log('画像最適化完了。サイズ:', ocrImage.length, 'bytes');

        loadingStatus.textContent = '画像を認識しています...';
        console.log('OCR処理開始');
        
        // OCR設定オプション
        const ocrOptions = {
            tessedit_pagesegmode: 6, // SPARSE_TEXT
        };
        
        let result = await worker.recognize(ocrImage, ocrOptions);
        console.log('OCR結果オブジェクト:', result ? '存在' : 'null');
        
        let extractedText = result?.data?.text ?? '';
        const confidence = result?.data?.confidence ?? 0;
        
        console.log('=== OCR結果 ===');
        console.log('抽出テキスト:', extractedText);
        console.log('テキスト長さ:', extractedText.length);
        console.log('信頼度:', confidence);
        console.log('==============');

        // 抽出テキストが空の場合はフォールバック
        if (!extractedText || extractedText.trim().length < 3) {
            console.warn('テキストが不足 (<3文字)。フォールバック試行...');
            loadingStatus.textContent = 'フォールバック処理を実行しています...';
            
            try {
                console.log('元画像でOCR試行');
                result = await worker.recognize(currentImage, ocrOptions);
                extractedText = result?.data?.text ?? '';
                console.log('フォールバック抽出テキスト:', extractedText);
                console.log('フォールバックテキスト長さ:', extractedText.length);
            } catch (fbErr) {
                console.error('フォールバックOCRエラー:', fbErr);
            }
        }

        // 最終テキスト確認
        if (!extractedText || !extractedText.trim()) {
            console.error('テキスト抽出失敗。空文字列のまま');
            extractedText = '';
        }

        console.log('最終的に解析するテキスト:', extractedText);
        console.log('最終テキスト長さ:', extractedText.length);

        // テキストを解析
        analyzeText(extractedText);
        
    } catch (error) {
        console.error('OCRエラー詳細:', {
            message: error?.message,
            name: error?.name,
            stack: error?.stack,
        });
        const msg = error?.message ? `画像の解析に失敗: ${error.message}` : '画像の解析に失敗しました。インターネット接続を確認し、ページをリロードしてください。';
        alert(msg);
    } finally {
        if (worker) {
            try {
                console.log('ワーカー終了中...');
                await worker.terminate();
                console.log('ワーカー終了完了');
            } catch (terminateError) {
                console.warn('ワーカー終了エラー:', terminateError);
            }
        }
        loadingOverlay.classList.remove('active');
        analyzeBtn.classList.remove('loading');
        analyzeBtn.disabled = false;
        console.log('===== 解析終了 =====');
    }
}

// テキスト解析
function analyzeText(text) {
    console.log('=== テキスト解析開始 ===');
    console.log('元のテキスト:', text.substring(0, 200));
    
    // 正規化: 小文字化、全角→半角、連続空白を単一空白に
    let normalizedText = (text || '')
        .toLowerCase()
        .normalize('NFKC')
        .replace(/\s+/g, ' ')
        .trim();
    
    console.log('正規化後のテキスト:', normalizedText.substring(0, 200));
    console.log('テキスト長さ:', normalizedText.length);
    console.log('日本語含む:', /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(normalizedText));
    
    const foundFatal = [];
    const foundCaution = [];
    const foundSafe = [];
    const allDetected = [];

    // 実際にテキストに書かれている成分名だけを表示する厳密一致マッチング
    const isStandaloneMatch = (haystack, needleLower) => {
        const matchIndex = haystack.indexOf(needleLower);
        if (matchIndex === -1) return false;

        const before = haystack[matchIndex - 1];
        const after = haystack[matchIndex + needleLower.length];

        const isWordChar = (ch) => {
            if (!ch) return false;
            return /[a-z0-9\u3040-\u30ff\u4e00-\u9fff]/i.test(ch);
        };

        const beforeIsWord = isWordChar(before);
        const afterIsWord = isWordChar(after);

        // 前後が文字列の一部になっている場合は除外（例: アボカドペースト の中の アボカド）
        if (beforeIsWord || afterIsWord) {
            return false;
        }

        return true;
    };

    const findMatches = (haystack, needleList) => {
        const matches = [];
        const seen = new Set();

        needleList.forEach(needle => {
            if (!needle || needle.length < 1) return;

            const needleLower = needle.toLowerCase().normalize('NFKC');

            if (isStandaloneMatch(haystack, needleLower)) {
                if (!seen.has(needle)) {
                    matches.push(needle);
                    seen.add(needle);
                    console.log(`✓ 厳密一致: "${needle}"`);
                }
            }
        });

        return matches;
    };

    console.log('=== 危険食材チェック（致命的） ===');
    const foundFatalList = findMatches(normalizedText, DANGEROUS_FOODS.fatal);
    foundFatal.push(...foundFatalList);
    allDetected.push(...foundFatalList);
    console.log('検出数:', foundFatalList.length);

    console.log('=== 危険食材チェック（注意） ===');
    const foundCautionList = findMatches(normalizedText, DANGEROUS_FOODS.caution || []);
    foundCaution.push(...foundCautionList);
    allDetected.push(...foundCautionList);
    console.log('検出数:', foundCautionList.length);

    console.log('=== 少量なら可の食材チェック ===');
    const foundLimitedList = findMatches(normalizedText, LIMITED_FOODS);
    foundSafe.push(...foundLimitedList);
    allDetected.push(...foundLimitedList);
    console.log('検出数:', foundLimitedList.length);

    console.log('=== テキスト解析結果 ===');
    console.log('致命的危険:', foundFatal);
    console.log('注意喚起:', foundCaution);
    console.log('安全:', foundSafe);
    console.log('全検出:', allDetected);
    console.log('======================');

    // 結果表示
    displayResults(foundFatal, foundCaution, foundSafe, allDetected, text);
}

// 日本語判定関数
function isJapanese(text) {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
}

// 日本語のみをフィルタリング
function filterJapaneseOnly(items) {
    return items.filter(item => isJapanese(item));
}

// 結果表示
function displayResults(fatal, caution, safe, allDetected, rawText) {
    resultSection.classList.add('active');

    // スクロール
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 日本語のみフィルタリング
    const fatalJp = filterJapaneseOnly(fatal);
    const cautionJp = filterJapaneseOnly(caution);
    const safeJp = filterJapaneseOnly(safe);

    // 危険な成分（日本語のみ）
    if (fatalJp.length > 0 || cautionJp.length > 0) {
        dangerousSection.style.display = 'block';
        const allDangerous = [...fatalJp, ...cautionJp];
        dangerousList.innerHTML = allDangerous.map(item => `<span>${item}</span>`).join('');
    } else {
        dangerousSection.style.display = 'none';
    }

    // 少量ならOKの成分（日本語のみ）
    if (safeJp.length > 0) {
        safeSection.style.display = 'block';
        safeList.innerHTML = safeJp.map(item => `<span>${item}</span>`).join('');
    } else {
        safeSection.style.display = 'none';
    }

    // 判定結果
    if (fatal.length > 0) {
        // 致命的な危険成分あり
        resultCard.className = 'result-card danger';
        resultIcon.textContent = '🚫';
        resultTitle.textContent = '絶対に与えないでください！';
        resultMessage.textContent = `モモンガにとって絶対に与えてはいけない成分（${fatalJp.length > 0 ? fatalJp.join('、') : fatal.join('、')}）が含まれています。`;
    } else if (caution.length > 0) {
        // 注意が必要な成分あり
        resultCard.className = 'result-card warning';
        resultIcon.textContent = '⚠️';
        resultTitle.textContent = '注意が必要です';
        resultMessage.textContent = `モモンガにとって注意が必要な成分（${cautionJp.length > 0 ? cautionJp.join('、') : caution.join('、')}）が含まれている可能性があります。`;
    } else if (safe.length > 0 || (rawText && rawText.trim().length > 0)) {
        // 少量ならOKの成分、または既知の危険成分がない原材料
        if (safe.length > 0) {
            resultCard.className = 'result-card warning';
            resultIcon.textContent = '⚠️';
            resultTitle.textContent = '少量ならOK';
            resultMessage.textContent = `少量なら食べられる可能性がある成分（${safeJp.length > 0 ? safeJp.join('、') : safe.join('、')}）が含まれています。与える量については獣医師に相談してください。詳しくは他のサイトで調べて適切に与えてください。`;
        } else {
            resultCard.className = 'result-card safe';
            resultIcon.textContent = '✅';
            resultTitle.textContent = '安全です';
            resultMessage.textContent = '絶対に食べてはいけないものや、少量なら食べられるものは検出されませんでした。ただし、与える前に必ず獣医師に相談してください。';
        }
    } else {
        // 判定不能
        resultCard.className = 'result-card warning';
        resultIcon.textContent = '🤔';
        resultTitle.textContent = '判定できませんでした';
        resultMessage.textContent = '食品表示のテキストを読み取れませんでした。以下をお試しください：<br>' +
            '• 画像の向きを確認してください（横向きで撮影）<br>' +
            '• より鮮明で大きな画像で試してください<br>' +
            '• 文字が影で隠れていないか確認してください<br>' +
            '• 懐中電灯などで均等に照らしてから撮影してください';
    }
}

// HTML側で定義した一覧をそのまま使う
// JSが後から内容を上書きしないようにするため、ここではリスト生成を行わない。
document.addEventListener('DOMContentLoaded', function() {
    if (!window.tesseractReady) {
        console.warn('Tesseract.js の読み込みに時間がかかっています...');
    }
});
