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
  { japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'Ohayou gozaimasu', german: 'Guten Morgen (höflich)', category: 'あいさつ' },
  { japanese: 'おはよう', hiragana: 'おはよう', romaji: 'Ohayou', german: 'Guten Morgen (freundschaftlich)', category: 'あいさつ' },
  { japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'Konnichiwa', german: 'Guten Tag / Hallo', category: 'あいさつ' },
  { japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'Konbanwa', german: 'Guten Abend', category: 'あいさつ' },
  { japanese: 'さようなら', hiragana: 'さようなら', romaji: 'Sayounara', german: 'Auf Wiedersehen', category: 'あいさつ' },
  { japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'Oyasuminasai', german: 'Gute Nacht', category: 'あいさつ' },
  { japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', german: 'Vielen Dank', category: 'あいさつ' },
  { japanese: 'すみません', hiragana: 'すみません', romaji: 'Sumimasen', german: 'Entschuldigung / Verzeihung', category: 'あいさつ' },
  { japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'Gomen nasai', german: 'Es tut mir leid', category: 'あいさつ' },
  { japanese: 'どうぞ', hiragana: 'どうぞ', romaji: 'Douzo', german: 'Bitte (beim Anbieten)', category: 'あいさつ' },
  { japanese: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'Dou itashimashite', german: 'Bitte sehr / Gern geschehen', category: 'あいさつ' },
  { japanese: 'はじめまして', hiragana: 'はじめまして', romaji: 'Hajimemashite', german: 'Freut mich, Sie kennenzulernen', category: 'あいさつ' },
  { japanese: 'よろしくおねがいします', hiragana: 'よろしくおねがいします', romaji: 'Yoroshiku onegaishimasu', german: 'Ich freue mich auf unsere Zusammenarbeit', category: 'あいさつ' },

  // ========== 数字 (Zahlen) ==========
  { japanese: '一', hiragana: 'いち', romaji: 'Ichi', german: 'eins', category: '数字' },
  { japanese: '二', hiragana: 'に', romaji: 'Ni', german: 'zwei', category: '数字' },
  { japanese: '三', hiragana: 'さん', romaji: 'San', german: 'drei', category: '数字' },
  { japanese: '四', hiragana: 'し／よん', romaji: 'Shi / Yon', german: 'vier', category: '数字' },
  { japanese: '五', hiragana: 'ご', romaji: 'Go', german: 'fünf', category: '数字' },
  { japanese: '六', hiragana: 'ろく', romaji: 'Roku', german: 'sechs', category: '数字' },
  { japanese: '七', hiragana: 'しち／なな', romaji: 'Shichi / Nana', german: 'sieben', category: '数字' },
  { japanese: '八', hiragana: 'はち', romaji: 'Hachi', german: 'acht', category: '数字' },
  { japanese: '九', hiragana: 'く／きゅう', romaji: 'Ku / Kyuu', german: 'neun', category: '数字' },
  { japanese: '十', hiragana: 'じゅう', romaji: 'Juu', german: 'zehn', category: '数字' },
  { japanese: '百', hiragana: 'ひゃく', romaji: 'Hyaku', german: 'hundert', category: '数字' },
  { japanese: '千', hiragana: 'せん', romaji: 'Sen', german: 'tausend', category: '数字' },

  // ========== 時間 (Zeit) ==========
  { japanese: '今', hiragana: 'いま', romaji: 'Ima', german: 'jetzt / gerade', category: '時間' },
  { japanese: '今日', hiragana: 'きょう', romaji: 'Kyou', german: 'heute', category: '時間' },
  { japanese: '明日', hiragana: 'あした', romaji: 'Ashita', german: 'morgen', category: '時間' },
  { japanese: '昨日', hiragana: 'きのう', romaji: 'Kinou', german: 'gestern', category: '時間' },
  { japanese: '朝', hiragana: 'あさ', romaji: 'Asa', german: 'Morgen (Tageszeit)', category: '時間' },
  { japanese: '昼', hiragana: 'ひる', romaji: 'Hiru', german: 'Mittag', category: '時間' },
  { japanese: '夜', hiragana: 'よる', romaji: 'Yoru', german: 'Abend / Nacht', category: '時間' },
  { japanese: '毎日', hiragana: 'まいにち', romaji: 'Mainichi', german: 'jeden Tag', category: '時間' },
  { japanese: '来週', hiragana: 'らいしゅう', romaji: 'Raishuu', german: 'nächste Woche', category: '時間' },
  { japanese: '先週', hiragana: 'せんしゅう', romaji: 'Senshuu', german: 'letzte Woche', category: '時間' },
  { japanese: '今週', hiragana: 'こんしゅう', romaji: 'Konshuu', german: 'diese Woche', category: '時間' },
  { japanese: '今年', hiragana: 'ことし', romaji: 'Kotoshi', german: 'dieses Jahr', category: '時間' },
  { japanese: '来年', hiragana: 'らいねん', romaji: 'Rainen', german: 'nächstes Jahr', category: '時間' },
  { japanese: '去年', hiragana: 'きょねん', romaji: 'Kyonen', german: 'letztes Jahr', category: '時間' },
  { japanese: '何時', hiragana: 'なんじ', romaji: 'Nanji', german: 'wie viel Uhr', category: '時間' },
  { japanese: '分', hiragana: 'ふん／ぷん', romaji: 'Fun / Pun', german: 'Minute', category: '時間' },
  { japanese: '時間', hiragana: 'じかん', romaji: 'Jikan', german: 'Zeit / Stunde', category: '時間' },

  // ========== 食べ物 (Essen) ==========
  { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'Gohan', german: 'Reis / Mahlzeit', category: '食べ物' },
  { japanese: 'パン', hiragana: 'パン', romaji: 'Pan', german: 'Brot', category: '食べ物' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: '食べ物' },
  { japanese: '肉', hiragana: 'にく', romaji: 'Niku', german: 'Fleisch', category: '食べ物' },
  { japanese: '卵', hiragana: 'たまご', romaji: 'Tamago', german: 'Ei', category: '食べ物' },
  { japanese: '野菜', hiragana: 'やさい', romaji: 'Yasai', german: 'Gemüse', category: '食べ物' },
  { japanese: '果物', hiragana: 'くだもの', romaji: 'Kudamono', german: 'Obst', category: '食べ物' },
  { japanese: '寿司', hiragana: 'すし', romaji: 'Sushi', german: 'Sushi', category: '食べ物' },
  { japanese: 'てんぷら', hiragana: 'てんぷら', romaji: 'Tenpura', german: 'Tempura', category: '食べ物' },
  { japanese: 'ラーメン', hiragana: 'ラーメン', romaji: 'Raamen', german: 'Ramen (Nudelsuppe)', category: '食べ物' },
  { japanese: 'りんご', hiragana: 'りんご', romaji: 'Ringo', german: 'Apfel', category: '食べ物' },
  { japanese: 'みかん', hiragana: 'みかん', romaji: 'Mikan', german: 'Mandarine', category: '食べ物' },
  { japanese: 'にんじん', hiragana: 'にんじん', romaji: 'Ninjin', german: 'Karotte', category: '食べ物' },
  { japanese: 'たまねぎ', hiragana: 'たまねぎ', romaji: 'Tamanegi', german: 'Zwiebel', category: '食べ物' },
  { japanese: 'とんかつ', hiragana: 'とんかつ', romaji: 'Tonkatsu', german: 'Schweineschnitzel', category: '食べ物' },

  // ========== 飲み物 (Getränke) ==========
  { japanese: '水', hiragana: 'みず', romaji: 'Mizu', german: 'Wasser', category: '飲み物' },
  { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'Ocha', german: 'Grüner Tee', category: '飲み物' },
  { japanese: '紅茶', hiragana: 'こうちゃ', romaji: 'Koucha', german: 'Schwarzer Tee', category: '飲み物' },
  { japanese: 'コーヒー', hiragana: 'コーヒー', romaji: 'Koohii', german: 'Kaffee', category: '飲み物' },
  { japanese: 'ジュース', hiragana: 'ジュース', romaji: 'Juusu', german: 'Saft', category: '飲み物' },
  { japanese: 'ビール', hiragana: 'ビール', romaji: 'Biiru', german: 'Bier', category: '飲み物' },
  { japanese: 'お酒', hiragana: 'おさけ', romaji: 'Osake', german: 'Alkohol / Sake', category: '飲み物' },
  { japanese: '牛乳', hiragana: 'ぎゅうにゅう', romaji: 'Gyuunyuu', german: 'Milch', category: '飲み物' },

  // ========== 家族 (Familie) ==========
  { japanese: '父', hiragana: 'ちち', romaji: 'Chichi', german: 'mein Vater', category: '家族' },
  { japanese: '母', hiragana: 'はは', romaji: 'Haha', german: 'meine Mutter', category: '家族' },
  { japanese: 'お父さん', hiragana: 'おとうさん', romaji: 'Otousan', german: 'Vater (höflich)', category: '家族' },
  { japanese: 'お母さん', hiragana: 'おかあさん', romaji: 'Okaasan', german: 'Mutter (höflich)', category: '家族' },
  { japanese: '兄', hiragana: 'あに', romaji: 'Ani', german: 'mein älterer Bruder', category: '家族' },
  { japanese: '姉', hiragana: 'あね', romaji: 'Ane', german: 'meine ältere Schwester', category: '家族' },
  { japanese: '弟', hiragana: 'おとうと', romaji: 'Otouto', german: 'mein jüngerer Bruder', category: '家族' },
  { japanese: '妹', hiragana: 'いもうと', romaji: 'Imouto', german: 'meine jüngere Schwester', category: '家族' },
  { japanese: '祖父', hiragana: 'そふ', romaji: 'Sofu', german: 'mein Großvater', category: '家族' },
  { japanese: '祖母', hiragana: 'そぼ', romaji: 'Sobo', german: 'meine Großmutter', category: '家族' },
  { japanese: 'おじいさん', hiragana: 'おじいさん', romaji: 'Ojiisan', german: 'Großvater (höflich)', category: '家族' },
  { japanese: 'おばあさん', hiragana: 'おばあさん', romaji: 'Obaasan', german: 'Großmutter (höflich)', category: '家族' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind', category: '家族' },
  { japanese: '家族', hiragana: 'かぞく', romaji: 'Kazoku', german: 'Familie', category: '家族' },

  // ========== 体 (Körper) ==========
  { japanese: '頭', hiragana: 'あたま', romaji: 'Atama', german: 'Kopf', category: '体' },
  { japanese: '目', hiragana: 'め', romaji: 'Me', german: 'Auge(n)', category: '体' },
  { japanese: '耳', hiragana: 'みみ', romaji: 'Mimi', german: 'Ohr(en)', category: '体' },
  { japanese: '鼻', hiragana: 'はな', romaji: 'Hana', german: 'Nase', category: '体' },
  { japanese: '口', hiragana: 'くち', romaji: 'Kuchi', german: 'Mund', category: '体' },
  { japanese: '手', hiragana: 'て', romaji: 'Te', german: 'Hand', category: '体' },
  { japanese: '足', hiragana: 'あし', romaji: 'Ashi', german: 'Fuß / Bein', category: '体' },
  { japanese: '体', hiragana: 'からだ', romaji: 'Karada', german: 'Körper', category: '体' },
  { japanese: '顔', hiragana: 'かお', romaji: 'Kao', german: 'Gesicht', category: '体' },
  { japanese: '髪', hiragana: 'かみ', romaji: 'Kami', german: 'Haar(e)', category: '体' },

  // ========== 場所 (Orte) ==========
  { japanese: '家', hiragana: 'いえ／うち', romaji: 'Ie / Uchi', german: 'Haus / Zuhause', category: '場所' },
  { japanese: '学校', hiragana: 'がっこう', romaji: 'Gakkou', german: 'Schule', category: '場所' },
  { japanese: '病院', hiragana: 'びょういん', romaji: 'Byouin', german: 'Krankenhaus', category: '場所' },
  { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'Ginkou', german: 'Bank', category: '場所' },
  { japanese: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'Yuubinkyoku', german: 'Post(amt)', category: '場所' },
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: '場所' },
  { japanese: '店', hiragana: 'みせ', romaji: 'Mise', german: 'Geschäft / Laden', category: '場所' },
  { japanese: 'レストラン', hiragana: 'レストラン', romaji: 'Resutoran', german: 'Restaurant', category: '場所' },
  { japanese: 'トイレ', hiragana: 'トイレ', romaji: 'Toire', german: 'Toilette', category: '場所' },
  { japanese: '出口', hiragana: 'でぐち', romaji: 'Deguchi', german: 'Ausgang', category: '場所' },
  { japanese: '入口', hiragana: 'いりぐち', romaji: 'Iriguchi', german: 'Eingang', category: '場所' },
  { japanese: '公園', hiragana: 'こうえん', romaji: 'Kouen', german: 'Park', category: '場所' },
  { japanese: '図書館', hiragana: 'としょかん', romaji: 'Toshokan', german: 'Bibliothek', category: '場所' },
  { japanese: 'スーパー', hiragana: 'スーパー', romaji: 'Suupaa', german: 'Supermarkt', category: '場所' },

  // ========== 乗り物 (Verkehrsmittel) ==========
  { japanese: '車', hiragana: 'くるま', romaji: 'Kuruma', german: 'Auto', category: '乗り物' },
  { japanese: '電車', hiragana: 'でんしゃ', romaji: 'Densha', german: 'Zug / S-Bahn', category: '乗り物' },
  { japanese: 'バス', hiragana: 'バス', romaji: 'Basu', german: 'Bus', category: '乗り物' },
  { japanese: '飛行機', hiragana: 'ひこうき', romaji: 'Hikouki', german: 'Flugzeug', category: '乗り物' },
  { japanese: '自転車', hiragana: 'じてんしゃ', romaji: 'Jitensha', german: 'Fahrrad', category: '乗り物' },
  { japanese: 'タクシー', hiragana: 'タクシー', romaji: 'Takushii', german: 'Taxi', category: '乗り物' },
  { japanese: '地下鉄', hiragana: 'ちかてつ', romaji: 'Chikatetsu', german: 'U-Bahn', category: '乗り物' },
  { japanese: '船', hiragana: 'ふね', romaji: 'Fune', german: 'Schiff / Boot', category: '乗り物' },

  // ========== 自然 (Natur) ==========
  { japanese: '空', hiragana: 'そら', romaji: 'Sora', german: 'Himmel', category: '自然' },
  { japanese: '山', hiragana: 'やま', romaji: 'Yama', german: 'Berg', category: '自然' },
  { japanese: '川', hiragana: 'かわ', romaji: 'Kawa', german: 'Fluss', category: '自然' },
  { japanese: '海', hiragana: 'うみ', romaji: 'Umi', german: 'Meer', category: '自然' },
  { japanese: '花', hiragana: 'はな', romaji: 'Hana', german: 'Blume', category: '自然' },
  { japanese: '木', hiragana: 'き', romaji: 'Ki', german: 'Baum / Holz', category: '自然' },
  { japanese: '月', hiragana: 'つき', romaji: 'Tsuki', german: 'Mond / Monat', category: '自然' },
  { japanese: '星', hiragana: 'ほし', romaji: 'Hoshi', german: 'Stern', category: '自然' },
  { japanese: '太陽', hiragana: 'たいよう', romaji: 'Taiyou', german: 'Sonne', category: '自然' },
  { japanese: '雨', hiragana: 'あめ', romaji: 'Ame', german: 'Regen', category: '自然' },
  { japanese: '雪', hiragana: 'ゆき', romaji: 'Yuki', german: 'Schnee', category: '自然' },

  // ========== 動物 (Tiere) ==========
  { japanese: '犬', hiragana: 'いぬ', romaji: 'Inu', german: 'Hund', category: '動物' },
  { japanese: '猫', hiragana: 'ねこ', romaji: 'Neko', german: 'Katze', category: '動物' },
  { japanese: '鳥', hiragana: 'とり', romaji: 'Tori', german: 'Vogel', category: '動物' },
  { japanese: '馬', hiragana: 'うま', romaji: 'Uma', german: 'Pferd', category: '動物' },
  { japanese: '牛', hiragana: 'うし', romaji: 'Ushi', german: 'Kuh / Rind', category: '動物' },
  { japanese: '豚', hiragana: 'ぶた', romaji: 'Buta', german: 'Schwein', category: '動物' },
  { japanese: 'うさぎ', hiragana: 'うさぎ', romaji: 'Usagi', german: 'Hase / Kaninchen', category: '動物' },
  { japanese: '熊', hiragana: 'くま', romaji: 'Kuma', german: 'Bär', category: '動物' },

  // ========== 形容詞 (Adjektive) ==========
  { japanese: '大きい', hiragana: 'おおきい', romaji: 'Ookii', german: 'groß', category: '形容詞' },
  { japanese: '小さい', hiragana: 'ちいさい', romaji: 'Chiisai', german: 'klein', category: '形容詞' },
  { japanese: '高い', hiragana: 'たかい', romaji: 'Takai', german: 'teuer / hoch', category: '形容詞' },
  { japanese: '安い', hiragana: 'やすい', romaji: 'Yasui', german: 'günstig / billig', category: '形容詞' },
  { japanese: '新しい', hiragana: 'あたらしい', romaji: 'Atarashii', german: 'neu', category: '形容詞' },
  { japanese: '古い', hiragana: 'ふるい', romaji: 'Furui', german: 'alt (Dinge)', category: '形容詞' },
  { japanese: 'いい', hiragana: 'いい', romaji: 'Ii', german: 'gut', category: '形容詞' },
  { japanese: '悪い', hiragana: 'わるい', romaji: 'Warui', german: 'schlecht / böse', category: '形容詞' },
  { japanese: '面白い', hiragana: 'おもしろい', romaji: 'Omoshiroi', german: 'interessant / lustig', category: '形容詞' },
  { japanese: 'つまらない', hiragana: 'つまらない', romaji: 'Tsumaranai', german: 'langweilig', category: '形容詞' },
  { japanese: '難しい', hiragana: 'むずかしい', romaji: 'Muzukashii', german: 'schwierig', category: '形容詞' },
  { japanese: '易しい', hiragana: 'やさしい', romaji: 'Yasashii', german: 'einfach / freundlich', category: '形容詞' },
  { japanese: '暑い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß (Wetter)', category: '形容詞' },
  { japanese: '寒い', hiragana: 'さむい', romaji: 'Samui', german: 'kalt (Wetter)', category: '形容詞' },
  { japanese: 'おいしい', hiragana: 'おいしい', romaji: 'Oishii', german: 'lecker', category: '形容詞' },
  { japanese: 'まずい', hiragana: 'まずい', romaji: 'Mazui', german: 'nicht lecker', category: '形容詞' },
  { japanese: 'きれい', hiragana: 'きれい', romaji: 'Kirei', german: 'schön / sauber', category: '形容詞' },
  { japanese: '静か', hiragana: 'しずか', romaji: 'Shizuka', german: 'ruhig / still', category: '形容詞' },
  { japanese: 'にぎやか', hiragana: 'にぎやか', romaji: 'Nigiyaka', german: 'lebhaft / belebt', category: '形容詞' },
  { japanese: '元気', hiragana: 'げんき', romaji: 'Genki', german: 'munter / gesund', category: '形容詞' },
  { japanese: '長い', hiragana: 'ながい', romaji: 'Nagai', german: 'lang', category: '形容詞' },
  { japanese: '短い', hiragana: 'みじかい', romaji: 'Mijikai', german: 'kurz', category: '形容詞' },
  { japanese: '早い', hiragana: 'はやい', romaji: 'Hayai', german: 'schnell / früh', category: '形容詞' },
  { japanese: '遅い', hiragana: 'おそい', romaji: 'Osoi', german: 'langsam / spät', category: '形容詞' },

  // ========== 動詞 (Verben) ==========
  { japanese: '食べる', hiragana: 'たべる', romaji: 'Taberu', german: 'essen', category: '動詞' },
  { japanese: '飲む', hiragana: 'のむ', romaji: 'Nomu', german: 'trinken', category: '動詞' },
  { japanese: '見る', hiragana: 'みる', romaji: 'Miru', german: 'sehen / schauen', category: '動詞' },
  { japanese: '聞く', hiragana: 'きく', romaji: 'Kiku', german: 'hören / fragen', category: '動詞' },
  { japanese: '読む', hiragana: 'よむ', romaji: 'Yomu', german: 'lesen', category: '動詞' },
  { japanese: '書く', hiragana: 'かく', romaji: 'Kaku', german: 'schreiben', category: '動詞' },
  { japanese: '話す', hiragana: 'はなす', romaji: 'Hanasu', german: 'sprechen / reden', category: '動詞' },
  { japanese: '行く', hiragana: 'いく', romaji: 'Iku', german: 'gehen / fahren', category: '動詞' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: '動詞' },
  { japanese: '帰る', hiragana: 'かえる', romaji: 'Kaeru', german: 'zurückkehren / nach Hause gehen', category: '動詞' },
  { japanese: '起きる', hiragana: 'おきる', romaji: 'Okiru', german: 'aufstehen / aufwachen', category: '動詞' },
  { japanese: '寝る', hiragana: 'ねる', romaji: 'Neru', german: 'schlafen / ins Bett gehen', category: '動詞' },
  { japanese: 'する', hiragana: 'する', romaji: 'Suru', german: 'tun / machen', category: '動詞' },
  { japanese: 'ある', hiragana: 'ある', romaji: 'Aru', german: 'vorhanden sein (Sachen)', category: '動詞' },
  { japanese: 'いる', hiragana: 'いる', romaji: 'Iru', german: 'da sein (Lebewesen)', category: '動詞' },
  { japanese: '分かる', hiragana: 'わかる', romaji: 'Wakaru', german: 'verstehen / wissen', category: '動詞' },
  { japanese: '買う', hiragana: 'かう', romaji: 'Kau', german: 'kaufen', category: '動詞' },
  { japanese: '売る', hiragana: 'うる', romaji: 'Uru', german: 'verkaufen', category: '動詞' },
  { japanese: '入る', hiragana: 'はいる', romaji: 'Hairu', german: 'eintreten / hineingehen', category: '動詞' },
  { japanese: '出る', hiragana: 'でる', romaji: 'Deru', german: 'herausgehen / verlassen', category: '動詞' },
  { japanese: '待つ', hiragana: 'まつ', romaji: 'Matsu', german: 'warten', category: '動詞' },
  { japanese: '会う', hiragana: 'あう', romaji: 'Au', german: 'treffen / begegnen', category: '動詞' },
  { japanese: '使う', hiragana: 'つかう', romaji: 'Tsukau', german: 'benutzen / verwenden', category: '動詞' },
  { japanese: '思う', hiragana: 'おもう', romaji: 'Omou', german: 'denken / meinen', category: '動詞' },
  { japanese: 'あける', hiragana: 'あける', romaji: 'Akeru', german: 'öffnen', category: '動詞' },
  { japanese: 'しめる', hiragana: 'しめる', romaji: 'Shimeru', german: 'schließen', category: '動詞' },

  // ========== 基本語 (Grundwörter) ==========
  { japanese: '私', hiragana: 'わたし', romaji: 'Watashi', german: 'ich / mein', category: '基本語' },
  { japanese: 'あなた', hiragana: 'あなた', romaji: 'Anata', german: 'du / Sie', category: '基本語' },
  { japanese: '彼', hiragana: 'かれ', romaji: 'Kare', german: 'er / sein', category: '基本語' },
  { japanese: '彼女', hiragana: 'かのじょ', romaji: 'Kanojo', german: 'sie (Frau)', category: '基本語' },
  { japanese: 'これ', hiragana: 'これ', romaji: 'Kore', german: 'dies (hier)', category: '基本語' },
  { japanese: 'それ', hiragana: 'それ', romaji: 'Sore', german: 'das (da)', category: '基本語' },
  { japanese: 'あれ', hiragana: 'あれ', romaji: 'Are', german: 'das (dort)', category: '基本語' },
  { japanese: 'ここ', hiragana: 'ここ', romaji: 'Koko', german: 'hier', category: '基本語' },
  { japanese: 'そこ', hiragana: 'そこ', romaji: 'Soko', german: 'da / dort', category: '基本語' },
  { japanese: 'あそこ', hiragana: 'あそこ', romaji: 'Asoko', german: 'da drüben / dort drüben', category: '基本語' },
  { japanese: '何', hiragana: 'なに／なん', romaji: 'Nani / Nan', german: 'was', category: '基本語' },
  { japanese: '誰', hiragana: 'だれ', romaji: 'Dare', german: 'wer', category: '基本語' },
  { japanese: 'どこ', hiragana: 'どこ', romaji: 'Doko', german: 'wo', category: '基本語' },
  { japanese: 'いつ', hiragana: 'いつ', romaji: 'Itsu', german: 'wann', category: '基本語' },
  { japanese: 'どれ', hiragana: 'どれ', romaji: 'Dore', german: 'welches', category: '基本語' },
  { japanese: 'いくら', hiragana: 'いくら', romaji: 'Ikura', german: 'wie viel (Preis)', category: '基本語' },
  { japanese: 'いくつ', hiragana: 'いくつ', romaji: 'Ikutsu', german: 'wie viele / wie alt', category: '基本語' },
  { japanese: 'なぜ', hiragana: 'なぜ', romaji: 'Naze', german: 'warum', category: '基本語' },
  { japanese: 'はい', hiragana: 'はい', romaji: 'Hai', german: 'ja', category: '基本語' },
  { japanese: 'いいえ', hiragana: 'いいえ', romaji: 'Iie', german: 'nein', category: '基本語' },

  // ========== 学校 (Schule) ==========
  { japanese: '先生', hiragana: 'せんせい', romaji: 'Sensei', german: 'Lehrer(in)', category: '学校' },
  { japanese: '学生', hiragana: 'がくせい', romaji: 'Gakusei', german: 'Student(in)', category: '学校' },
  { japanese: '生徒', hiragana: 'せいと', romaji: 'Seito', german: 'Schüler(in)', category: '学校' },
  { japanese: '教室', hiragana: 'きょうしつ', romaji: 'Kyoushitsu', german: 'Klassenzimmer', category: '学校' },
  { japanese: '本', hiragana: 'ほん', romaji: 'Hon', german: 'Buch', category: '学校' },
  { japanese: 'ノート', hiragana: 'ノート', romaji: 'Nooto', german: 'Heft / Notizbuch', category: '学校' },
  { japanese: '鉛筆', hiragana: 'えんぴつ', romaji: 'Enpitsu', german: 'Bleistift', category: '学校' },
  { japanese: 'ペン', hiragana: 'ペン', romaji: 'Pen', german: 'Kugelschreiber', category: '学校' },
  { japanese: '鞄', hiragana: 'かばん', romaji: 'Kaban', german: 'Tasche', category: '学校' },
  { japanese: '机', hiragana: 'つくえ', romaji: 'Tsukue', german: 'Schreibtisch', category: '学校' },
  { japanese: '椅子', hiragana: 'いす', romaji: 'Isu', german: 'Stuhl', category: '学校' },

  // ========== 服 (Kleidung) ==========
  { japanese: 'シャツ', hiragana: 'シャツ', romaji: 'Shatsu', german: 'Hemd / T-Shirt', category: '服' },
  { japanese: 'ズボン', hiragana: 'ズボン', romaji: 'Zubon', german: 'Hose', category: '服' },
  { japanese: 'スカート', hiragana: 'スカート', romaji: 'Sukaato', german: 'Rock', category: '服' },
  { japanese: 'ワンピース', hiragana: 'ワンピース', romaji: 'Wanpiisu', german: 'Kleid', category: '服' },
  { japanese: '上着', hiragana: 'うわぎ', romaji: 'Uwagi', german: 'Jacke / Mantel', category: '服' },
  { japanese: '靴', hiragana: 'くつ', romaji: 'Kutsu', german: 'Schuhe', category: '服' },
  { japanese: '靴下', hiragana: 'くつした', romaji: 'Kutsushita', german: 'Socken', category: '服' },
  { japanese: '帽子', hiragana: 'ぼうし', romaji: 'Boushi', german: 'Hut / Mütze', category: '服' },
  { japanese: '眼鏡', hiragana: 'めがね', romaji: 'Megane', german: 'Brille', category: '服' },
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
