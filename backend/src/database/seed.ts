import db, { initDb } from './db';

interface VocabEntry {
  japanese: string;
  hiragana: string;
  romaji: string;
  german: string;
  category: string;
}

const vocabulary: VocabEntry[] = [
  // ========== あいさつ (Begrüßung) ==========
  { japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'Ohayou gozaimasu', german: 'Guten Morgen (höflich)', category: 'Begrüßung' },
  { japanese: 'おはよう', hiragana: 'おはよう', romaji: 'Ohayou', german: 'Guten Morgen (freundschaftlich)', category: 'Begrüßung' },
  { japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'Konnichiwa', german: 'Guten Tag / Hallo', category: 'Begrüßung' },
  { japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'Konbanwa', german: 'Guten Abend', category: 'Begrüßung' },
  { japanese: 'さようなら', hiragana: 'さようなら', romaji: 'Sayounara', german: 'Auf Wiedersehen', category: 'Begrüßung' },
  { japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'Oyasuminasai', german: 'Gute Nacht', category: 'Begrüßung' },
  { japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', german: 'Vielen Dank', category: 'Begrüßung' },
  { japanese: 'すみません', hiragana: 'すみません', romaji: 'Sumimasen', german: 'Entschuldigung / Verzeihung', category: 'Begrüßung' },
  { japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'Gomen nasai', german: 'Es tut mir leid', category: 'Begrüßung' },
  { japanese: 'どうぞ', hiragana: 'どうぞ', romaji: 'Douzo', german: 'Bitte (beim Anbieten)', category: 'Begrüßung' },
  { japanese: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'Dou itashimashite', german: 'Bitte sehr / Gern geschehen', category: 'Begrüßung' },
  { japanese: 'はじめまして', hiragana: 'はじめまして', romaji: 'Hajimemashite', german: 'Freut mich, Sie kennenzulernen', category: 'Begrüßung' },
  { japanese: 'よろしくおねがいします', hiragana: 'よろしくおねがいします', romaji: 'Yoroshiku onegaishimasu', german: 'Ich freue mich auf unsere Zusammenarbeit', category: 'Begrüßung' },

  // ========== 数字 (Zahlen) ==========
  { japanese: '一', hiragana: 'いち', romaji: 'Ichi', german: 'eins', category: 'Zahlen' },
  { japanese: '二', hiragana: 'に', romaji: 'Ni', german: 'zwei', category: 'Zahlen' },
  { japanese: '三', hiragana: 'さん', romaji: 'San', german: 'drei', category: 'Zahlen' },
  { japanese: '四', hiragana: 'し／よん', romaji: 'Shi / Yon', german: 'vier', category: 'Zahlen' },
  { japanese: '五', hiragana: 'ご', romaji: 'Go', german: 'fünf', category: 'Zahlen' },
  { japanese: '六', hiragana: 'ろく', romaji: 'Roku', german: 'sechs', category: 'Zahlen' },
  { japanese: '七', hiragana: 'しち／なな', romaji: 'Shichi / Nana', german: 'sieben', category: 'Zahlen' },
  { japanese: '八', hiragana: 'はち', romaji: 'Hachi', german: 'acht', category: 'Zahlen' },
  { japanese: '九', hiragana: 'く／きゅう', romaji: 'Ku / Kyuu', german: 'neun', category: 'Zahlen' },
  { japanese: '十', hiragana: 'じゅう', romaji: 'Juu', german: 'zehn', category: 'Zahlen' },
  { japanese: '百', hiragana: 'ひゃく', romaji: 'Hyaku', german: 'hundert', category: 'Zahlen' },
  { japanese: '千', hiragana: 'せん', romaji: 'Sen', german: 'tausend', category: 'Zahlen' },

  // ========== 時間 (Zeit) ==========
  { japanese: '今', hiragana: 'いま', romaji: 'Ima', german: 'jetzt / gerade', category: 'Zeit' },
  { japanese: '今日', hiragana: 'きょう', romaji: 'Kyou', german: 'heute', category: 'Zeit' },
  { japanese: '明日', hiragana: 'あした', romaji: 'Ashita', german: 'morgen', category: 'Zeit' },
  { japanese: '昨日', hiragana: 'きのう', romaji: 'Kinou', german: 'gestern', category: 'Zeit' },
  { japanese: '朝', hiragana: 'あさ', romaji: 'Asa', german: 'Morgen (Tageszeit)', category: 'Zeit' },
  { japanese: '昼', hiragana: 'ひる', romaji: 'Hiru', german: 'Mittag', category: 'Zeit' },
  { japanese: '夜', hiragana: 'よる', romaji: 'Yoru', german: 'Abend / Nacht', category: 'Zeit' },
  { japanese: '毎日', hiragana: 'まいにち', romaji: 'Mainichi', german: 'jeden Tag', category: 'Zeit' },
  { japanese: '来週', hiragana: 'らいしゅう', romaji: 'Raishuu', german: 'nächste Woche', category: 'Zeit' },
  { japanese: '先週', hiragana: 'せんしゅう', romaji: 'Senshuu', german: 'letzte Woche', category: 'Zeit' },
  { japanese: '今週', hiragana: 'こんしゅう', romaji: 'Konshuu', german: 'diese Woche', category: 'Zeit' },
  { japanese: '今年', hiragana: 'ことし', romaji: 'Kotoshi', german: 'dieses Jahr', category: 'Zeit' },
  { japanese: '来年', hiragana: 'らいねん', romaji: 'Rainen', german: 'nächstes Jahr', category: 'Zeit' },
  { japanese: '去年', hiragana: 'きょねん', romaji: 'Kyonen', german: 'letztes Jahr', category: 'Zeit' },
  { japanese: '何時', hiragana: 'なんじ', romaji: 'Nanji', german: 'wie viel Uhr', category: 'Zeit' },
  { japanese: '分', hiragana: 'ふん／ぷん', romaji: 'Fun / Pun', german: 'Minute', category: 'Zeit' },
  { japanese: '時間', hiragana: 'じかん', romaji: 'Jikan', german: 'Zeit / Stunde', category: 'Zeit' },

  // ========== 食べ物 (Essen) ==========
  { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'Gohan', german: 'Reis / Mahlzeit', category: 'Essen' },
  { japanese: 'パン', hiragana: 'パン', romaji: 'Pan', german: 'Brot', category: 'Essen' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: 'Essen' },
  { japanese: '肉', hiragana: 'にく', romaji: 'Niku', german: 'Fleisch', category: 'Essen' },
  { japanese: '卵', hiragana: 'たまご', romaji: 'Tamago', german: 'Ei', category: 'Essen' },
  { japanese: '野菜', hiragana: 'やさい', romaji: 'Yasai', german: 'Gemüse', category: 'Essen' },
  { japanese: '果物', hiragana: 'くだもの', romaji: 'Kudamono', german: 'Obst', category: 'Essen' },
  { japanese: '寿司', hiragana: 'すし', romaji: 'Sushi', german: 'Sushi', category: 'Essen' },
  { japanese: 'てんぷら', hiragana: 'てんぷら', romaji: 'Tenpura', german: 'Tempura', category: 'Essen' },
  { japanese: 'ラーメン', hiragana: 'ラーメン', romaji: 'Raamen', german: 'Ramen (Nudelsuppe)', category: 'Essen' },
  { japanese: 'りんご', hiragana: 'りんご', romaji: 'Ringo', german: 'Apfel', category: 'Essen' },
  { japanese: 'みかん', hiragana: 'みかん', romaji: 'Mikan', german: 'Mandarine', category: 'Essen' },
  { japanese: 'にんじん', hiragana: 'にんじん', romaji: 'Ninjin', german: 'Karotte', category: 'Essen' },
  { japanese: 'たまねぎ', hiragana: 'たまねぎ', romaji: 'Tamanegi', german: 'Zwiebel', category: 'Essen' },
  { japanese: 'とんかつ', hiragana: 'とんかつ', romaji: 'Tonkatsu', german: 'Schweineschnitzel', category: 'Essen' },

  // ========== 飲み物 (Getränke) ==========
  { japanese: '水', hiragana: 'みず', romaji: 'Mizu', german: 'Wasser', category: 'Getränke' },
  { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'Ocha', german: 'Grüner Tee', category: 'Getränke' },
  { japanese: '紅茶', hiragana: 'こうちゃ', romaji: 'Koucha', german: 'Schwarzer Tee', category: 'Getränke' },
  { japanese: 'コーヒー', hiragana: 'コーヒー', romaji: 'Koohii', german: 'Kaffee', category: 'Getränke' },
  { japanese: 'ジュース', hiragana: 'ジュース', romaji: 'Juusu', german: 'Saft', category: 'Getränke' },
  { japanese: 'ビール', hiragana: 'ビール', romaji: 'Biiru', german: 'Bier', category: 'Getränke' },
  { japanese: 'お酒', hiragana: 'おさけ', romaji: 'Osake', german: 'Alkohol / Sake', category: 'Getränke' },
  { japanese: '牛乳', hiragana: 'ぎゅうにゅう', romaji: 'Gyuunyuu', german: 'Milch', category: 'Getränke' },

  // ========== 家族 (Familie) ==========
  { japanese: '父', hiragana: 'ちち', romaji: 'Chichi', german: 'mein Vater', category: 'Familie' },
  { japanese: '母', hiragana: 'はは', romaji: 'Haha', german: 'meine Mutter', category: 'Familie' },
  { japanese: 'お父さん', hiragana: 'おとうさん', romaji: 'Otousan', german: 'Vater (höflich)', category: 'Familie' },
  { japanese: 'お母さん', hiragana: 'おかあさん', romaji: 'Okaasan', german: 'Mutter (höflich)', category: 'Familie' },
  { japanese: '兄', hiragana: 'あに', romaji: 'Ani', german: 'mein älterer Bruder', category: 'Familie' },
  { japanese: '姉', hiragana: 'あね', romaji: 'Ane', german: 'meine ältere Schwester', category: 'Familie' },
  { japanese: '弟', hiragana: 'おとうと', romaji: 'Otouto', german: 'mein jüngerer Bruder', category: 'Familie' },
  { japanese: '妹', hiragana: 'いもうと', romaji: 'Imouto', german: 'meine jüngere Schwester', category: 'Familie' },
  { japanese: '祖父', hiragana: 'そふ', romaji: 'Sofu', german: 'mein Großvater', category: 'Familie' },
  { japanese: '祖母', hiragana: 'そぼ', romaji: 'Sobo', german: 'meine Großmutter', category: 'Familie' },
  { japanese: 'おじいさん', hiragana: 'おじいさん', romaji: 'Ojiisan', german: 'Großvater (höflich)', category: 'Familie' },
  { japanese: 'おばあさん', hiragana: 'おばあさん', romaji: 'Obaasan', german: 'Großmutter (höflich)', category: 'Familie' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind', category: 'Familie' },
  { japanese: '家族', hiragana: 'かぞく', romaji: 'Kazoku', german: 'Familie', category: 'Familie' },

  // ========== 体 (Körper) ==========
  { japanese: '頭', hiragana: 'あたま', romaji: 'Atama', german: 'Kopf', category: 'Körper' },
  { japanese: '目', hiragana: 'め', romaji: 'Me', german: 'Auge(n)', category: 'Körper' },
  { japanese: '耳', hiragana: 'みみ', romaji: 'Mimi', german: 'Ohr(en)', category: 'Körper' },
  { japanese: '鼻', hiragana: 'はな', romaji: 'Hana', german: 'Nase', category: 'Körper' },
  { japanese: '口', hiragana: 'くち', romaji: 'Kuchi', german: 'Mund', category: 'Körper' },
  { japanese: '手', hiragana: 'て', romaji: 'Te', german: 'Hand', category: 'Körper' },
  { japanese: '足', hiragana: 'あし', romaji: 'Ashi', german: 'Fuß / Bein', category: 'Körper' },
  { japanese: '体', hiragana: 'からだ', romaji: 'Karada', german: 'Körper', category: 'Körper' },
  { japanese: '顔', hiragana: 'かお', romaji: 'Kao', german: 'Gesicht', category: 'Körper' },
  { japanese: '髪', hiragana: 'かみ', romaji: 'Kami', german: 'Haar(e)', category: 'Körper' },

  // ========== 場所 (Orte) ==========
  { japanese: '家', hiragana: 'いえ／うち', romaji: 'Ie / Uchi', german: 'Haus / Zuhause', category: 'Orte' },
  { japanese: '学校', hiragana: 'がっこう', romaji: 'Gakkou', german: 'Schule', category: 'Orte' },
  { japanese: '病院', hiragana: 'びょういん', romaji: 'Byouin', german: 'Krankenhaus', category: 'Orte' },
  { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'Ginkou', german: 'Bank', category: 'Orte' },
  { japanese: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'Yuubinkyoku', german: 'Post(amt)', category: 'Orte' },
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: 'Orte' },
  { japanese: '店', hiragana: 'みせ', romaji: 'Mise', german: 'Geschäft / Laden', category: 'Orte' },
  { japanese: 'レストラン', hiragana: 'レストラン', romaji: 'Resutoran', german: 'Restaurant', category: 'Orte' },
  { japanese: 'トイレ', hiragana: 'トイレ', romaji: 'Toire', german: 'Toilette', category: 'Orte' },
  { japanese: '出口', hiragana: 'でぐち', romaji: 'Deguchi', german: 'Ausgang', category: 'Orte' },
  { japanese: '入口', hiragana: 'いりぐち', romaji: 'Iriguchi', german: 'Eingang', category: 'Orte' },
  { japanese: '公園', hiragana: 'こうえん', romaji: 'Kouen', german: 'Park', category: 'Orte' },
  { japanese: '図書館', hiragana: 'としょかん', romaji: 'Toshokan', german: 'Bibliothek', category: 'Orte' },
  { japanese: 'スーパー', hiragana: 'スーパー', romaji: 'Suupaa', german: 'Supermarkt', category: 'Orte' },

  // ========== 乗り物 (Verkehrsmittel) ==========
  { japanese: '車', hiragana: 'くるま', romaji: 'Kuruma', german: 'Auto', category: 'Verkehr' },
  { japanese: '電車', hiragana: 'でんしゃ', romaji: 'Densha', german: 'Zug / S-Bahn', category: 'Verkehr' },
  { japanese: 'バス', hiragana: 'バス', romaji: 'Basu', german: 'Bus', category: 'Verkehr' },
  { japanese: '飛行機', hiragana: 'ひこうき', romaji: 'Hikouki', german: 'Flugzeug', category: 'Verkehr' },
  { japanese: '自転車', hiragana: 'じてんしゃ', romaji: 'Jitensha', german: 'Fahrrad', category: 'Verkehr' },
  { japanese: 'タクシー', hiragana: 'タクシー', romaji: 'Takushii', german: 'Taxi', category: 'Verkehr' },
  { japanese: '地下鉄', hiragana: 'ちかてつ', romaji: 'Chikatetsu', german: 'U-Bahn', category: 'Verkehr' },
  { japanese: '船', hiragana: 'ふね', romaji: 'Fune', german: 'Schiff / Boot', category: 'Verkehr' },

  // ========== 自然 (Natur) ==========
  { japanese: '空', hiragana: 'そら', romaji: 'Sora', german: 'Himmel', category: 'Natur' },
  { japanese: '山', hiragana: 'やま', romaji: 'Yama', german: 'Berg', category: 'Natur' },
  { japanese: '川', hiragana: 'かわ', romaji: 'Kawa', german: 'Fluss', category: 'Natur' },
  { japanese: '海', hiragana: 'うみ', romaji: 'Umi', german: 'Meer', category: 'Natur' },
  { japanese: '花', hiragana: 'はな', romaji: 'Hana', german: 'Blume', category: 'Natur' },
  { japanese: '木', hiragana: 'き', romaji: 'Ki', german: 'Baum / Holz', category: 'Natur' },
  { japanese: '月', hiragana: 'つき', romaji: 'Tsuki', german: 'Mond / Monat', category: 'Natur' },
  { japanese: '星', hiragana: 'ほし', romaji: 'Hoshi', german: 'Stern', category: 'Natur' },
  { japanese: '太陽', hiragana: 'たいよう', romaji: 'Taiyou', german: 'Sonne', category: 'Natur' },
  { japanese: '雨', hiragana: 'あめ', romaji: 'Ame', german: 'Regen', category: 'Natur' },
  { japanese: '雪', hiragana: 'ゆき', romaji: 'Yuki', german: 'Schnee', category: 'Natur' },

  // ========== 動物 (Tiere) ==========
  { japanese: '犬', hiragana: 'いぬ', romaji: 'Inu', german: 'Hund', category: 'Tiere' },
  { japanese: '猫', hiragana: 'ねこ', romaji: 'Neko', german: 'Katze', category: 'Tiere' },
  { japanese: '鳥', hiragana: 'とり', romaji: 'Tori', german: 'Vogel', category: 'Tiere' },
  { japanese: '馬', hiragana: 'うま', romaji: 'Uma', german: 'Pferd', category: 'Tiere' },
  { japanese: '牛', hiragana: 'うし', romaji: 'Ushi', german: 'Kuh / Rind', category: 'Tiere' },
  { japanese: '豚', hiragana: 'ぶた', romaji: 'Buta', german: 'Schwein', category: 'Tiere' },
  { japanese: 'うさぎ', hiragana: 'うさぎ', romaji: 'Usagi', german: 'Hase / Kaninchen', category: 'Tiere' },
  { japanese: '熊', hiragana: 'くま', romaji: 'Kuma', german: 'Bär', category: 'Tiere' },

  // ========== 形容詞 (Adjektive) ==========
  { japanese: '大きい', hiragana: 'おおきい', romaji: 'Ookii', german: 'groß', category: 'Adjektive' },
  { japanese: '小さい', hiragana: 'ちいさい', romaji: 'Chiisai', german: 'klein', category: 'Adjektive' },
  { japanese: '高い', hiragana: 'たかい', romaji: 'Takai', german: 'teuer / hoch', category: 'Adjektive' },
  { japanese: '安い', hiragana: 'やすい', romaji: 'Yasui', german: 'günstig / billig', category: 'Adjektive' },
  { japanese: '新しい', hiragana: 'あたらしい', romaji: 'Atarashii', german: 'neu', category: 'Adjektive' },
  { japanese: '古い', hiragana: 'ふるい', romaji: 'Furui', german: 'alt (Dinge)', category: 'Adjektive' },
  { japanese: 'いい', hiragana: 'いい', romaji: 'Ii', german: 'gut', category: 'Adjektive' },
  { japanese: '悪い', hiragana: 'わるい', romaji: 'Warui', german: 'schlecht / böse', category: 'Adjektive' },
  { japanese: '面白い', hiragana: 'おもしろい', romaji: 'Omoshiroi', german: 'interessant / lustig', category: 'Adjektive' },
  { japanese: 'つまらない', hiragana: 'つまらない', romaji: 'Tsumaranai', german: 'langweilig', category: 'Adjektive' },
  { japanese: '難しい', hiragana: 'むずかしい', romaji: 'Muzukashii', german: 'schwierig', category: 'Adjektive' },
  { japanese: '易しい', hiragana: 'やさしい', romaji: 'Yasashii', german: 'einfach / freundlich', category: 'Adjektive' },
  { japanese: '暑い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß (Wetter)', category: 'Adjektive' },
  { japanese: '寒い', hiragana: 'さむい', romaji: 'Samui', german: 'kalt (Wetter)', category: 'Adjektive' },
  { japanese: 'おいしい', hiragana: 'おいしい', romaji: 'Oishii', german: 'lecker', category: 'Adjektive' },
  { japanese: 'まずい', hiragana: 'まずい', romaji: 'Mazui', german: 'nicht lecker', category: 'Adjektive' },
  { japanese: 'きれい', hiragana: 'きれい', romaji: 'Kirei', german: 'schön / sauber', category: 'Adjektive' },
  { japanese: '静か', hiragana: 'しずか', romaji: 'Shizuka', german: 'ruhig / still', category: 'Adjektive' },
  { japanese: 'にぎやか', hiragana: 'にぎやか', romaji: 'Nigiyaka', german: 'lebhaft / belebt', category: 'Adjektive' },
  { japanese: '元気', hiragana: 'げんき', romaji: 'Genki', german: 'munter / gesund', category: 'Adjektive' },
  { japanese: '長い', hiragana: 'ながい', romaji: 'Nagai', german: 'lang', category: 'Adjektive' },
  { japanese: '短い', hiragana: 'みじかい', romaji: 'Mijikai', german: 'kurz', category: 'Adjektive' },
  { japanese: '早い', hiragana: 'はやい', romaji: 'Hayai', german: 'schnell / früh', category: 'Adjektive' },
  { japanese: '遅い', hiragana: 'おそい', romaji: 'Osoi', german: 'langsam / spät', category: 'Adjektive' },

  // ========== 動詞 (Verben) ==========
  { japanese: '食べる', hiragana: 'たべる', romaji: 'Taberu', german: 'essen', category: 'Verben' },
  { japanese: '飲む', hiragana: 'のむ', romaji: 'Nomu', german: 'trinken', category: 'Verben' },
  { japanese: '見る', hiragana: 'みる', romaji: 'Miru', german: 'sehen / schauen', category: 'Verben' },
  { japanese: '聞く', hiragana: 'きく', romaji: 'Kiku', german: 'hören / fragen', category: 'Verben' },
  { japanese: '読む', hiragana: 'よむ', romaji: 'Yomu', german: 'lesen', category: 'Verben' },
  { japanese: '書く', hiragana: 'かく', romaji: 'Kaku', german: 'schreiben', category: 'Verben' },
  { japanese: '話す', hiragana: 'はなす', romaji: 'Hanasu', german: 'sprechen / reden', category: 'Verben' },
  { japanese: '行く', hiragana: 'いく', romaji: 'Iku', german: 'gehen / fahren', category: 'Verben' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: 'Verben' },
  { japanese: '帰る', hiragana: 'かえる', romaji: 'Kaeru', german: 'zurückkehren / nach Hause gehen', category: 'Verben' },
  { japanese: '起きる', hiragana: 'おきる', romaji: 'Okiru', german: 'aufstehen / aufwachen', category: 'Verben' },
  { japanese: '寝る', hiragana: 'ねる', romaji: 'Neru', german: 'schlafen / ins Bett gehen', category: 'Verben' },
  { japanese: 'する', hiragana: 'する', romaji: 'Suru', german: 'tun / machen', category: 'Verben' },
  { japanese: 'ある', hiragana: 'ある', romaji: 'Aru', german: 'vorhanden sein (Sachen)', category: 'Verben' },
  { japanese: 'いる', hiragana: 'いる', romaji: 'Iru', german: 'da sein (Lebewesen)', category: 'Verben' },
  { japanese: '分かる', hiragana: 'わかる', romaji: 'Wakaru', german: 'verstehen / wissen', category: 'Verben' },
  { japanese: '買う', hiragana: 'かう', romaji: 'Kau', german: 'kaufen', category: 'Verben' },
  { japanese: '売る', hiragana: 'うる', romaji: 'Uru', german: 'verkaufen', category: 'Verben' },
  { japanese: '入る', hiragana: 'はいる', romaji: 'Hairu', german: 'eintreten / hineingehen', category: 'Verben' },
  { japanese: '出る', hiragana: 'でる', romaji: 'Deru', german: 'herausgehen / verlassen', category: 'Verben' },
  { japanese: '待つ', hiragana: 'まつ', romaji: 'Matsu', german: 'warten', category: 'Verben' },
  { japanese: '会う', hiragana: 'あう', romaji: 'Au', german: 'treffen / begegnen', category: 'Verben' },
  { japanese: '使う', hiragana: 'つかう', romaji: 'Tsukau', german: 'benutzen / verwenden', category: 'Verben' },
  { japanese: '思う', hiragana: 'おもう', romaji: 'Omou', german: 'denken / meinen', category: 'Verben' },
  { japanese: 'あける', hiragana: 'あける', romaji: 'Akeru', german: 'öffnen', category: 'Verben' },
  { japanese: 'しめる', hiragana: 'しめる', romaji: 'Shimeru', german: 'schließen', category: 'Verben' },

  // ========== 基本語 (Grundwörter) ==========
  { japanese: '私', hiragana: 'わたし', romaji: 'Watashi', german: 'ich / mein', category: 'Grundwörter' },
  { japanese: 'あなた', hiragana: 'あなた', romaji: 'Anata', german: 'du / Sie', category: 'Grundwörter' },
  { japanese: '彼', hiragana: 'かれ', romaji: 'Kare', german: 'er / sein', category: 'Grundwörter' },
  { japanese: '彼女', hiragana: 'かのじょ', romaji: 'Kanojo', german: 'sie (Frau)', category: 'Grundwörter' },
  { japanese: 'これ', hiragana: 'これ', romaji: 'Kore', german: 'dies (hier)', category: 'Grundwörter' },
  { japanese: 'それ', hiragana: 'それ', romaji: 'Sore', german: 'das (da)', category: 'Grundwörter' },
  { japanese: 'あれ', hiragana: 'あれ', romaji: 'Are', german: 'das (dort)', category: 'Grundwörter' },
  { japanese: 'ここ', hiragana: 'ここ', romaji: 'Koko', german: 'hier', category: 'Grundwörter' },
  { japanese: 'そこ', hiragana: 'そこ', romaji: 'Soko', german: 'da / dort', category: 'Grundwörter' },
  { japanese: 'あそこ', hiragana: 'あそこ', romaji: 'Asoko', german: 'da drüben / dort drüben', category: 'Grundwörter' },
  { japanese: '何', hiragana: 'なに／なん', romaji: 'Nani / Nan', german: 'was', category: 'Grundwörter' },
  { japanese: '誰', hiragana: 'だれ', romaji: 'Dare', german: 'wer', category: 'Grundwörter' },
  { japanese: 'どこ', hiragana: 'どこ', romaji: 'Doko', german: 'wo', category: 'Grundwörter' },
  { japanese: 'いつ', hiragana: 'いつ', romaji: 'Itsu', german: 'wann', category: 'Grundwörter' },
  { japanese: 'どれ', hiragana: 'どれ', romaji: 'Dore', german: 'welches', category: 'Grundwörter' },
  { japanese: 'いくら', hiragana: 'いくら', romaji: 'Ikura', german: 'wie viel (Preis)', category: 'Grundwörter' },
  { japanese: 'いくつ', hiragana: 'いくつ', romaji: 'Ikutsu', german: 'wie viele / wie alt', category: 'Grundwörter' },
  { japanese: 'なぜ', hiragana: 'なぜ', romaji: 'Naze', german: 'warum', category: 'Grundwörter' },
  { japanese: 'はい', hiragana: 'はい', romaji: 'Hai', german: 'ja', category: 'Grundwörter' },
  { japanese: 'いいえ', hiragana: 'いいえ', romaji: 'Iie', german: 'nein', category: 'Grundwörter' },

  // ========== 学校 (Schule) ==========
  { japanese: '先生', hiragana: 'せんせい', romaji: 'Sensei', german: 'Lehrer(in)', category: 'Schule' },
  { japanese: '学生', hiragana: 'がくせい', romaji: 'Gakusei', german: 'Student(in)', category: 'Schule' },
  { japanese: '生徒', hiragana: 'せいと', romaji: 'Seito', german: 'Schüler(in)', category: 'Schule' },
  { japanese: '教室', hiragana: 'きょうしつ', romaji: 'Kyoushitsu', german: 'Klassenzimmer', category: 'Schule' },
  { japanese: '本', hiragana: 'ほん', romaji: 'Hon', german: 'Buch', category: 'Schule' },
  { japanese: 'ノート', hiragana: 'ノート', romaji: 'Nooto', german: 'Heft / Notizbuch', category: 'Schule' },
  { japanese: '鉛筆', hiragana: 'えんぴつ', romaji: 'Enpitsu', german: 'Bleistift', category: 'Schule' },
  { japanese: 'ペン', hiragana: 'ペン', romaji: 'Pen', german: 'Kugelschreiber', category: 'Schule' },
  { japanese: '鞄', hiragana: 'かばん', romaji: 'Kaban', german: 'Tasche', category: 'Schule' },
  { japanese: '机', hiragana: 'つくえ', romaji: 'Tsukue', german: 'Schreibtisch', category: 'Schule' },
  { japanese: '椅子', hiragana: 'いす', romaji: 'Isu', german: 'Stuhl', category: 'Schule' },

  // ========== 服 (Kleidung) ==========
  { japanese: 'シャツ', hiragana: 'シャツ', romaji: 'Shatsu', german: 'Hemd / T-Shirt', category: 'Kleidung' },
  { japanese: 'ズボン', hiragana: 'ズボン', romaji: 'Zubon', german: 'Hose', category: 'Kleidung' },
  { japanese: 'スカート', hiragana: 'スカート', romaji: 'Sukaato', german: 'Rock', category: 'Kleidung' },
  { japanese: 'ワンピース', hiragana: 'ワンピース', romaji: 'Wanpiisu', german: 'Kleid', category: 'Kleidung' },
  { japanese: '上着', hiragana: 'うわぎ', romaji: 'Uwagi', german: 'Jacke / Mantel', category: 'Kleidung' },
  { japanese: '靴', hiragana: 'くつ', romaji: 'Kutsu', german: 'Schuhe', category: 'Kleidung' },
  { japanese: '靴下', hiragana: 'くつした', romaji: 'Kutsushita', german: 'Socken', category: 'Kleidung' },
  { japanese: '帽子', hiragana: 'ぼうし', romaji: 'Boushi', german: 'Hut / Mütze', category: 'Kleidung' },
  { japanese: '眼鏡', hiragana: 'めがね', romaji: 'Megane', german: 'Brille', category: 'Kleidung' },
];

export async function seed(): Promise<void> {
  await initDb();

  const existing = await db.execute('SELECT COUNT(*) as count FROM vocabulary');
  const count = existing.rows[0]?.count as number ?? 0;

  if (count > 0) {
    console.log(`Database already has ${count} vocabulary entries. Skipping seed.`);
    return;
  }

  for (const entry of vocabulary) {
    const result = await db.execute({
      sql: `INSERT INTO vocabulary (japanese, hiragana, romaji, german, category)
            VALUES (?, ?, ?, ?, ?)`,
      args: [entry.japanese, entry.hiragana, entry.romaji, entry.german, entry.category],
    });
    await db.execute({
      sql: `INSERT OR IGNORE INTO progress (vocabulary_id, score, review_count, next_review)
            VALUES (?, 0, 0, datetime('now'))`,
      args: [result.lastInsertRowid],
    });
  }

  console.log(`🌸 Seeded ${vocabulary.length} vocabulary entries.`);
}
