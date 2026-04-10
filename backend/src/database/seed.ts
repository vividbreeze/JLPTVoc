import db, { initDb } from './db';

interface VocabEntry {
  japanese: string;
  hiragana: string;
  romaji: string;
  german: string;
  category: string;
}

const vocabulary: VocabEntry[] = [

  // ═══════════════════════════════════════════════════════
  // WEGBESCHREIBUNG
  // ═══════════════════════════════════════════════════════
  { japanese: 'すみません', hiragana: 'すみません', romaji: 'Sumimasen', german: 'Entschuldigung', category: 'Wegbeschreibung' },
  { japanese: 'どこ', hiragana: 'どこ', romaji: 'Doko', german: 'wo', category: 'Wegbeschreibung' },
  { japanese: '右', hiragana: 'みぎ', romaji: 'Migi', german: 'rechts', category: 'Wegbeschreibung' },
  { japanese: '左', hiragana: 'ひだり', romaji: 'Hidari', german: 'links', category: 'Wegbeschreibung' },
  { japanese: 'まっすぐ', hiragana: 'まっすぐ', romaji: 'Massugu', german: 'geradeaus', category: 'Wegbeschreibung' },
  { japanese: '前', hiragana: 'まえ', romaji: 'Mae', german: 'vorne / vor', category: 'Wegbeschreibung' },
  { japanese: '後ろ', hiragana: 'うしろ', romaji: 'Ushiro', german: 'hinten / hinter', category: 'Wegbeschreibung' },
  { japanese: '交差点', hiragana: 'こうさてん', romaji: 'Kousaten', german: 'Kreuzung', category: 'Wegbeschreibung' },
  { japanese: '角', hiragana: 'かど', romaji: 'Kado', german: 'Ecke', category: 'Wegbeschreibung' },
  { japanese: '信号', hiragana: 'しんごう', romaji: 'Shingou', german: 'Ampel', category: 'Wegbeschreibung' },
  { japanese: '道', hiragana: 'みち', romaji: 'Michi', german: 'Straße / Weg', category: 'Wegbeschreibung' },
  { japanese: '地図', hiragana: 'ちず', romaji: 'Chizu', german: 'Karte / Stadtplan', category: 'Wegbeschreibung' },
  { japanese: '近い', hiragana: 'ちかい', romaji: 'Chikai', german: 'nah / in der Nähe', category: 'Wegbeschreibung' },
  { japanese: '遠い', hiragana: 'とおい', romaji: 'Tooi', german: 'weit / entfernt', category: 'Wegbeschreibung' },
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: 'Wegbeschreibung' },
  { japanese: '出口', hiragana: 'でぐち', romaji: 'Deguchi', german: 'Ausgang', category: 'Wegbeschreibung' },
  { japanese: '入口', hiragana: 'いりぐち', romaji: 'Iriguchi', german: 'Eingang', category: 'Wegbeschreibung' },
  { japanese: 'バス停', hiragana: 'バスてい', romaji: 'Basu-tei', german: 'Bushaltestelle', category: 'Wegbeschreibung' },
  { japanese: '曲がる', hiragana: 'まがる', romaji: 'Magaru', german: 'abbiegen', category: 'Wegbeschreibung' },
  { japanese: '渡る', hiragana: 'わたる', romaji: 'Wataru', german: 'überqueren', category: 'Wegbeschreibung' },
  { japanese: '歩く', hiragana: 'あるく', romaji: 'Aruku', german: 'Zu Fuß gehen', category: 'Wegbeschreibung' },
  { japanese: '〜分かかります', hiragana: 'ふんかかります', romaji: '~fun kakarimasu', german: 'Es dauert ~ Minuten', category: 'Wegbeschreibung' },
  { japanese: '分かりません', hiragana: 'わかりません', romaji: 'Wakarimasen', german: 'Ich weiß es nicht', category: 'Wegbeschreibung' },
  { japanese: 'この辺', hiragana: 'このへん', romaji: 'Kono hen', german: 'In dieser Gegend', category: 'Wegbeschreibung' },
  { japanese: '〜の前', hiragana: 'のまえ', romaji: '~no mae', german: 'Vor ~', category: 'Wegbeschreibung' },
  { japanese: '〜の隣', hiragana: 'のとなり', romaji: '~no tonari', german: 'Neben ~', category: 'Wegbeschreibung' },
  { japanese: '地下鉄', hiragana: 'ちかてつ', romaji: 'Chikatetsu', german: 'U-Bahn', category: 'Wegbeschreibung' },
  { japanese: 'タクシー', hiragana: 'タクシー', romaji: 'Takushii', german: 'Taxi', category: 'Wegbeschreibung' },
  { japanese: 'すみません、〜はどこですか？', hiragana: 'すみません、〜はどこですか？', romaji: 'Sumimasen, ~ wa doko desu ka?', german: 'Entschuldigung, wo ist ~?', category: 'Wegbeschreibung' },
  { japanese: 'まっすぐ行ってください。', hiragana: 'まっすぐいってください。', romaji: 'Massugu itte kudasai.', german: 'Bitte gehen Sie geradeaus.', category: 'Wegbeschreibung' },
  { japanese: '左に曲がってください。', hiragana: 'ひだりにまがってください。', romaji: 'Hidari ni magatte kudasai.', german: 'Bitte biegen Sie links ab.', category: 'Wegbeschreibung' },
  { japanese: 'ここから歩いて五分です。', hiragana: 'ここからあるいてごふんです。', romaji: 'Koko kara aruite gofun desu.', german: 'Von hier aus sind es fünf Minuten zu Fuß.', category: 'Wegbeschreibung' },
  { japanese: '駅はこの近くにありますか？', hiragana: 'えきはこのちかくにありますか？', romaji: 'Eki wa kono chikaku ni arimasu ka?', german: 'Ist der Bahnhof in der Nähe?', category: 'Wegbeschreibung' },
  { japanese: 'すみません、道に迷いました。', hiragana: 'すみません、みちにまよいました。', romaji: 'Sumimasen, michi ni mayoimashita.', german: 'Entschuldigung, ich habe mich verlaufen.', category: 'Wegbeschreibung' },

  // ═══════════════════════════════════════════════════════
  // RESTAURANT
  // ═══════════════════════════════════════════════════════
  { japanese: 'レストラン', hiragana: 'レストラン', romaji: 'Resutoran', german: 'Restaurant', category: 'Restaurant' },
  { japanese: '食堂', hiragana: 'しょくどう', romaji: 'Shokudou', german: 'Speisesaal / Kantine', category: 'Restaurant' },
  { japanese: '席', hiragana: 'せき', romaji: 'Seki', german: 'Platz / Sitzplatz', category: 'Restaurant' },
  { japanese: 'メニュー', hiragana: 'メニュー', romaji: 'Menyuu', german: 'Menü / Speisekarte', category: 'Restaurant' },
  { japanese: '注文', hiragana: 'ちゅうもん', romaji: 'Chuumon', german: 'Bestellung', category: 'Restaurant' },
  { japanese: 'お会計', hiragana: 'おかいけい', romaji: 'Okaikei', german: 'Rechnung', category: 'Restaurant' },
  { japanese: '予約', hiragana: 'よやく', romaji: 'Yoyaku', german: 'Reservierung', category: 'Restaurant' },
  { japanese: 'お箸', hiragana: 'おはし', romaji: 'Ohashi', german: 'Stäbchen', category: 'Restaurant' },
  { japanese: 'スプーン', hiragana: 'スプーン', romaji: 'Supuun', german: 'Löffel', category: 'Restaurant' },
  { japanese: 'フォーク', hiragana: 'フォーク', romaji: 'Fooku', german: 'Gabel', category: 'Restaurant' },
  { japanese: 'すし', hiragana: 'すし', romaji: 'Sushi', german: 'Sushi', category: 'Restaurant' },
  { japanese: 'ラーメン', hiragana: 'ラーメン', romaji: 'Raamen', german: 'Ramen (Nudelsuppe)', category: 'Restaurant' },
  { japanese: 'うどん', hiragana: 'うどん', romaji: 'Udon', german: 'Udon-Nudeln', category: 'Restaurant' },
  { japanese: 'そば', hiragana: 'そば', romaji: 'Soba', german: 'Buchweizennudeln', category: 'Restaurant' },
  { japanese: '天ぷら', hiragana: 'てんぷら', romaji: 'Tenpura', german: 'Tempura', category: 'Restaurant' },
  { japanese: 'カレー', hiragana: 'カレー', romaji: 'Karee', german: 'Curry', category: 'Restaurant' },
  { japanese: '刺身', hiragana: 'さしみ', romaji: 'Sashimi', german: 'Sashimi (roher Fisch)', category: 'Restaurant' },
  { japanese: '餃子', hiragana: 'ぎょうざ', romaji: 'Gyouza', german: 'Gyoza (Teigtaschen)', category: 'Restaurant' },
  { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'Gohan', german: 'Reis / Mahlzeit', category: 'Restaurant' },
  { japanese: 'パン', hiragana: 'パン', romaji: 'Pan', german: 'Brot', category: 'Restaurant' },
  { japanese: '肉', hiragana: 'にく', romaji: 'Niku', german: 'Fleisch', category: 'Restaurant' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: 'Restaurant' },
  { japanese: '野菜', hiragana: 'やさい', romaji: 'Yasai', german: 'Gemüse', category: 'Restaurant' },
  { japanese: '卵', hiragana: 'たまご', romaji: 'Tamago', german: 'Ei', category: 'Restaurant' },
  { japanese: 'お水', hiragana: 'おみず', romaji: 'Omizu', german: 'Wasser', category: 'Restaurant' },
  { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'Ocha', german: 'Tee', category: 'Restaurant' },
  { japanese: 'コーヒー', hiragana: 'コーヒー', romaji: 'Koohii', german: 'Kaffee', category: 'Restaurant' },
  { japanese: 'ビール', hiragana: 'ビール', romaji: 'Biiru', german: 'Bier', category: 'Restaurant' },
  { japanese: 'ジュース', hiragana: 'ジュース', romaji: 'Juusu', german: 'Saft', category: 'Restaurant' },
  { japanese: 'おいしい', hiragana: 'おいしい', romaji: 'Oishii', german: 'lecker / köstlich', category: 'Restaurant' },
  { japanese: '辛い', hiragana: 'からい', romaji: 'Karai', german: 'scharf (Geschmack)', category: 'Restaurant' },
  { japanese: '甘い', hiragana: 'あまい', romaji: 'Amai', german: 'süß', category: 'Restaurant' },
  { japanese: '熱い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß (Speise/Getränk)', category: 'Restaurant' },
  { japanese: '冷たい', hiragana: 'つめたい', romaji: 'Tsumetai', german: 'kalt (Speise/Getränk)', category: 'Restaurant' },
  { japanese: '食べる', hiragana: 'たべる', romaji: 'Taberu', german: 'essen', category: 'Restaurant' },
  { japanese: '飲む', hiragana: 'のむ', romaji: 'Nomu', german: 'trinken', category: 'Restaurant' },
  { japanese: '一人です。席はありますか？', hiragana: 'ひとりです。せきはありますか？', romaji: 'Hitori desu. Seki wa arimasu ka?', german: 'Ich bin allein. Gibt es einen Platz?', category: 'Restaurant' },
  { japanese: '〜をください。', hiragana: 'をください', romaji: '~ wo kudasai.', german: 'Geben Sie mir bitte ~.', category: 'Restaurant' },
  { japanese: 'お会計をお願いします。', hiragana: 'おかいけいをおねがいします。', romaji: 'Okaikei wo onegaishimasu.', german: 'Die Rechnung bitte.', category: 'Restaurant' },
  { japanese: 'これはとてもおいしいです！', hiragana: 'これはとてもおいしいです！', romaji: 'Kore wa totemo oishii desu!', german: 'Das ist sehr lecker!', category: 'Restaurant' },
  { japanese: 'アレルギーがあります。', hiragana: 'アレルギーがあります。', romaji: 'Arerugii ga arimasu.', german: 'Ich habe eine Allergie.', category: 'Restaurant' },

  // ═══════════════════════════════════════════════════════
  // EINKAUFEN
  // ═══════════════════════════════════════════════════════
  { japanese: '店', hiragana: 'みせ', romaji: 'Mise', german: 'Geschäft / Laden', category: 'Einkaufen' },
  { japanese: 'スーパー', hiragana: 'スーパー', romaji: 'Suupaa', german: 'Supermarkt', category: 'Einkaufen' },
  { japanese: 'デパート', hiragana: 'デパート', romaji: 'Depaato', german: 'Kaufhaus', category: 'Einkaufen' },
  { japanese: 'コンビニ', hiragana: 'コンビニ', romaji: 'Konbini', german: 'Convenience Store', category: 'Einkaufen' },
  { japanese: '値段', hiragana: 'ねだん', romaji: 'Nedan', german: 'Preis', category: 'Einkaufen' },
  { japanese: 'お金', hiragana: 'おかね', romaji: 'Okane', german: 'Geld', category: 'Einkaufen' },
  { japanese: '円', hiragana: 'えん', romaji: 'En', german: 'Yen', category: 'Einkaufen' },
  { japanese: '高い', hiragana: 'たかい', romaji: 'Takai', german: 'teuer', category: 'Einkaufen' },
  { japanese: '安い', hiragana: 'やすい', romaji: 'Yasui', german: 'günstig / billig', category: 'Einkaufen' },
  { japanese: '大きい', hiragana: 'おおきい', romaji: 'Ookii', german: 'groß', category: 'Einkaufen' },
  { japanese: '小さい', hiragana: 'ちいさい', romaji: 'Chiisai', german: 'klein', category: 'Einkaufen' },
  { japanese: '買う', hiragana: 'かう', romaji: 'Kau', german: 'kaufen', category: 'Einkaufen' },
  { japanese: '売る', hiragana: 'うる', romaji: 'Uru', german: 'verkaufen', category: 'Einkaufen' },
  { japanese: '払う', hiragana: 'はらう', romaji: 'Harau', german: 'bezahlen', category: 'Einkaufen' },
  { japanese: '探す', hiragana: 'さがす', romaji: 'Sagasu', german: 'suchen', category: 'Einkaufen' },
  { japanese: 'レシート', hiragana: 'レシート', romaji: 'Reshiito', german: 'Kassenbon / Quittung', category: 'Einkaufen' },
  { japanese: '袋', hiragana: 'ふくろ', romaji: 'Fukuro', german: 'Beutel / Tüte', category: 'Einkaufen' },
  { japanese: 'セール', hiragana: 'セール', romaji: 'Seeru', german: 'Schlussverkauf / Sale', category: 'Einkaufen' },
  { japanese: '赤', hiragana: 'あか', romaji: 'Aka', german: 'rot', category: 'Einkaufen' },
  { japanese: '青', hiragana: 'あお', romaji: 'Ao', german: 'blau', category: 'Einkaufen' },
  { japanese: '白', hiragana: 'しろ', romaji: 'Shiro', german: 'weiß', category: 'Einkaufen' },
  { japanese: '黒', hiragana: 'くろ', romaji: 'Kuro', german: 'schwarz', category: 'Einkaufen' },
  { japanese: '黄色', hiragana: 'きいろ', romaji: 'Kiiro', german: 'gelb', category: 'Einkaufen' },
  { japanese: '緑', hiragana: 'みどり', romaji: 'Midori', german: 'grün', category: 'Einkaufen' },
  { japanese: 'これはいくらですか？', hiragana: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?', german: 'Wie viel kostet das?', category: 'Einkaufen' },
  { japanese: '〜はありますか？', hiragana: 'はありますか？', romaji: '~ wa arimasu ka?', german: 'Haben Sie ~?', category: 'Einkaufen' },
  { japanese: 'カードで払えますか？', hiragana: 'カードではらえますか？', romaji: 'Kaado de haraemasu ka?', german: 'Kann ich mit Karte bezahlen?', category: 'Einkaufen' },
  { japanese: 'ちょっと考えます。', hiragana: 'ちょっとかんがえます。', romaji: 'Chotto kangaemasu.', german: 'Ich überlege es mir kurz.', category: 'Einkaufen' },
  { japanese: 'これをください。', hiragana: 'これをください。', romaji: 'Kore wo kudasai.', german: 'Das hier bitte.', category: 'Einkaufen' },

  // ═══════════════════════════════════════════════════════
  // KENNENLERNEN
  // ═══════════════════════════════════════════════════════
  { japanese: 'はじめまして', hiragana: 'はじめまして', romaji: 'Hajimemashite', german: 'Schön, Sie kennenzulernen', category: 'Kennenlernen' },
  { japanese: 'よろしくお願いします', hiragana: 'よろしくおねがいします', romaji: 'Yoroshiku onegaishimasu', german: 'Freut mich (höflich)', category: 'Kennenlernen' },
  { japanese: '名前', hiragana: 'なまえ', romaji: 'Namae', german: 'Name', category: 'Kennenlernen' },
  { japanese: '国', hiragana: 'くに', romaji: 'Kuni', german: 'Land / Heimatland', category: 'Kennenlernen' },
  { japanese: '日本', hiragana: 'にほん', romaji: 'Nihon', german: 'Japan', category: 'Kennenlernen' },
  { japanese: 'ドイツ', hiragana: 'ドイツ', romaji: 'Doitsu', german: 'Deutschland', category: 'Kennenlernen' },
  { japanese: '仕事', hiragana: 'しごと', romaji: 'Shigoto', german: 'Arbeit / Beruf', category: 'Kennenlernen' },
  { japanese: '会社員', hiragana: 'かいしゃいん', romaji: 'Kaishain', german: 'Angestellter', category: 'Kennenlernen' },
  { japanese: '学生', hiragana: 'がくせい', romaji: 'Gakusei', german: 'Student / Schüler', category: 'Kennenlernen' },
  { japanese: '先生', hiragana: 'せんせい', romaji: 'Sensei', german: 'Lehrer / Sensei', category: 'Kennenlernen' },
  { japanese: '年齢', hiragana: 'ねんれい', romaji: 'Nenrei', german: 'Alter', category: 'Kennenlernen' },
  { japanese: '〜歳', hiragana: 'さい', romaji: '~sai', german: '~ Jahre alt', category: 'Kennenlernen' },
  { japanese: '趣味', hiragana: 'しゅみ', romaji: 'Shumi', german: 'Hobby', category: 'Kennenlernen' },
  { japanese: '住む', hiragana: 'すむ', romaji: 'Sumu', german: 'wohnen / leben', category: 'Kennenlernen' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: 'Kennenlernen' },
  { japanese: 'どちらから', hiragana: 'どちらから', romaji: 'Dochira kara', german: 'Woher (höflich)', category: 'Kennenlernen' },
  { japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', german: 'Vielen Dank', category: 'Kennenlernen' },
  { japanese: 'どうぞ', hiragana: 'どうぞ', romaji: 'Douzo', german: 'Bitte / Hier bitte', category: 'Kennenlernen' },
  { japanese: 'そうです', hiragana: 'そうです', romaji: 'Sou desu', german: 'Ja, genau / Das stimmt', category: 'Kennenlernen' },
  { japanese: '違います', hiragana: 'ちがいます', romaji: 'Chigaimasu', german: 'Das ist falsch / Nein', category: 'Kennenlernen' },
  { japanese: 'もう一度', hiragana: 'もういちど', romaji: 'Mou ichido', german: 'Noch einmal', category: 'Kennenlernen' },
  { japanese: 'ゆっくり', hiragana: 'ゆっくり', romaji: 'Yukkuri', german: 'langsam', category: 'Kennenlernen' },
  { japanese: '日本語', hiragana: 'にほんご', romaji: 'Nihongo', german: 'Japanisch (Sprache)', category: 'Kennenlernen' },
  { japanese: 'お名前は何ですか？', hiragana: 'おなまえはなんですか？', romaji: 'Onamae wa nan desu ka?', german: 'Wie heißen Sie?', category: 'Kennenlernen' },
  { japanese: 'どちらからですか？', hiragana: 'どちらからですか？', romaji: 'Dochira kara desu ka?', german: 'Woher kommen Sie?', category: 'Kennenlernen' },
  { japanese: 'お仕事は何ですか？', hiragana: 'おしごとはなんですか？', romaji: 'Oshigoto wa nan desu ka?', german: 'Was machen Sie beruflich?', category: 'Kennenlernen' },
  { japanese: 'ドイツから来ました。', hiragana: 'ドイツからきました。', romaji: 'Doitsu kara kimashita.', german: 'Ich komme aus Deutschland.', category: 'Kennenlernen' },
  { japanese: '日本語を少し話せます。', hiragana: 'にほんごをすこしはなせます。', romaji: 'Nihongo wo sukoshi hanasemasu.', german: 'Ich spreche ein bisschen Japanisch.', category: 'Kennenlernen' },

  // ═══════════════════════════════════════════════════════
  // MUSEUM
  // ═══════════════════════════════════════════════════════
  { japanese: '博物館', hiragana: 'はくぶつかん', romaji: 'Hakubutsukan', german: 'Museum', category: 'Museum' },
  { japanese: '美術館', hiragana: 'びじゅつかん', romaji: 'Bijutsukan', german: 'Kunstmuseum', category: 'Museum' },
  { japanese: 'チケット', hiragana: 'チケット', romaji: 'Chiketto', german: 'Ticket / Eintrittskarte', category: 'Museum' },
  { japanese: '入場料', hiragana: 'にゅうじょうりょう', romaji: 'Nyuujouryou', german: 'Eintrittspreis', category: 'Museum' },
  { japanese: '大人', hiragana: 'おとな', romaji: 'Otona', german: 'Erwachsener', category: 'Museum' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind', category: 'Museum' },
  { japanese: '写真', hiragana: 'しゃしん', romaji: 'Shashin', german: 'Foto', category: 'Museum' },
  { japanese: '禁止', hiragana: 'きんし', romaji: 'Kinshi', german: 'verboten', category: 'Museum' },
  { japanese: '展示', hiragana: 'てんじ', romaji: 'Tenji', german: 'Ausstellung', category: 'Museum' },
  { japanese: '案内', hiragana: 'あんない', romaji: 'Annai', german: 'Führung / Information', category: 'Museum' },
  { japanese: 'パンフレット', hiragana: 'パンフレット', romaji: 'Panfuretto', german: 'Broschüre / Flyer', category: 'Museum' },
  { japanese: 'トイレ', hiragana: 'トイレ', romaji: 'Toire', german: 'Toilette', category: 'Museum' },
  { japanese: '開く', hiragana: 'あく', romaji: 'Aku', german: 'öffnen / geöffnet sein', category: 'Museum' },
  { japanese: '閉まる', hiragana: 'しまる', romaji: 'Shimaru', german: 'schließen / geschlossen sein', category: 'Museum' },
  { japanese: '面白い', hiragana: 'おもしろい', romaji: 'Omoshiroi', german: 'interessant', category: 'Museum' },
  { japanese: '素晴らしい', hiragana: 'すばらしい', romaji: 'Subarashii', german: 'wunderbar / großartig', category: 'Museum' },
  { japanese: '何時まで', hiragana: 'なんじまで', romaji: 'Nanji made', german: 'Bis wie viel Uhr', category: 'Museum' },
  { japanese: 'チケットを一枚ください。', hiragana: 'チケットをいちまいください。', romaji: 'Chiketto wo ichimai kudasai.', german: 'Ein Ticket bitte.', category: 'Museum' },
  { japanese: '大人二枚お願いします。', hiragana: 'おとなにまいおねがいします。', romaji: 'Otona nimai onegaishimasu.', german: 'Zwei Erwachsenentickets bitte.', category: 'Museum' },
  { japanese: '写真を撮ってもいいですか？', hiragana: 'しゃしんをとってもいいですか？', romaji: 'Shashin wo totte mo ii desu ka?', german: 'Darf ich fotografieren?', category: 'Museum' },
  { japanese: '何時まで開いていますか？', hiragana: 'なんじまであいていますか？', romaji: 'Nanji made aite imasu ka?', german: 'Bis wie viel Uhr haben Sie geöffnet?', category: 'Museum' },

  // ═══════════════════════════════════════════════════════
  // HOTEL
  // ═══════════════════════════════════════════════════════
  { japanese: 'ホテル', hiragana: 'ホテル', romaji: 'Hoteru', german: 'Hotel', category: 'Hotel' },
  { japanese: '旅館', hiragana: 'りょかん', romaji: 'Ryokan', german: 'Japanisches Gasthaus', category: 'Hotel' },
  { japanese: '部屋', hiragana: 'へや', romaji: 'Heya', german: 'Zimmer', category: 'Hotel' },
  { japanese: 'チェックイン', hiragana: 'チェックイン', romaji: 'Chekkuin', german: 'Check-in', category: 'Hotel' },
  { japanese: 'チェックアウト', hiragana: 'チェックアウト', romaji: 'Chekkuauto', german: 'Check-out', category: 'Hotel' },
  { japanese: '予約', hiragana: 'よやく', romaji: 'Yoyaku', german: 'Reservierung / Buchung', category: 'Hotel' },
  { japanese: '鍵', hiragana: 'かぎ', romaji: 'Kagi', german: 'Schlüssel', category: 'Hotel' },
  { japanese: '朝食', hiragana: 'ちょうしょく', romaji: 'Choushoku', german: 'Frühstück', category: 'Hotel' },
  { japanese: 'フロント', hiragana: 'フロント', romaji: 'Furonto', german: 'Rezeption', category: 'Hotel' },
  { japanese: 'エレベーター', hiragana: 'エレベーター', romaji: 'Erebeetaa', german: 'Aufzug', category: 'Hotel' },
  { japanese: '一泊', hiragana: 'いっぱく', romaji: 'Ippaku', german: 'Eine Nacht', category: 'Hotel' },
  { japanese: 'シャワー', hiragana: 'シャワー', romaji: 'Shawaa', german: 'Dusche', category: 'Hotel' },
  { japanese: 'タオル', hiragana: 'タオル', romaji: 'Taoru', german: 'Handtuch', category: 'Hotel' },
  { japanese: '静か', hiragana: 'しずか', romaji: 'Shizuka', german: 'ruhig', category: 'Hotel' },
  { japanese: '広い', hiragana: 'ひろい', romaji: 'Hiroi', german: 'geräumig / weit', category: 'Hotel' },
  { japanese: '泊まる', hiragana: 'とまる', romaji: 'Tomaru', german: 'übernachten', category: 'Hotel' },
  { japanese: 'チェックインをお願いします。', hiragana: 'チェックインをおねがいします。', romaji: 'Chekkuin wo onegaishimasu.', german: 'Ich möchte einchecken.', category: 'Hotel' },
  { japanese: '〜という名前で予約しています。', hiragana: 'というなまえでよやくしています。', romaji: '~ to iu namae de yoyaku shite imasu.', german: 'Ich habe eine Reservierung unter dem Namen ~.', category: 'Hotel' },
  { japanese: '朝食は何時ですか？', hiragana: 'ちょうしょくはなんじですか？', romaji: 'Choushoku wa nanji desu ka?', german: 'Um wie viel Uhr ist das Frühstück?', category: 'Hotel' },
  { japanese: '鍵をなくしました。', hiragana: 'かぎをなくしました。', romaji: 'Kagi wo nakushimashita.', german: 'Ich habe meinen Schlüssel verloren.', category: 'Hotel' },
  { japanese: '一泊いくらですか？', hiragana: 'いっぱくいくらですか？', romaji: 'Ippaku ikura desu ka?', german: 'Was kostet eine Nacht?', category: 'Hotel' },

  // ═══════════════════════════════════════════════════════
  // FLUGHAFEN
  // ═══════════════════════════════════════════════════════
  { japanese: '空港', hiragana: 'くうこう', romaji: 'Kuukou', german: 'Flughafen', category: 'Flughafen' },
  { japanese: '飛行機', hiragana: 'ひこうき', romaji: 'Hikouki', german: 'Flugzeug', category: 'Flughafen' },
  { japanese: 'パスポート', hiragana: 'パスポート', romaji: 'Pasupooto', german: 'Reisepass', category: 'Flughafen' },
  { japanese: '搭乗券', hiragana: 'とうじょうけん', romaji: 'Toujouken', german: 'Bordkarte', category: 'Flughafen' },
  { japanese: '荷物', hiragana: 'にもつ', romaji: 'Nimotsu', german: 'Gepäck', category: 'Flughafen' },
  { japanese: '手荷物', hiragana: 'てにもつ', romaji: 'Tenimotsu', german: 'Handgepäck', category: 'Flughafen' },
  { japanese: '出発', hiragana: 'しゅっぱつ', romaji: 'Shuppatsu', german: 'Abflug / Abfahrt', category: 'Flughafen' },
  { japanese: '到着', hiragana: 'とうちゃく', romaji: 'Touchaku', german: 'Ankunft', category: 'Flughafen' },
  { japanese: 'ゲート', hiragana: 'ゲート', romaji: 'Geeto', german: 'Gate', category: 'Flughafen' },
  { japanese: '税関', hiragana: 'ぜいかん', romaji: 'Zeikan', german: 'Zoll', category: 'Flughafen' },
  { japanese: '乗り継ぎ', hiragana: 'のりつぎ', romaji: 'Noritsugi', german: 'Umstieg / Transit', category: 'Flughafen' },
  { japanese: '遅延', hiragana: 'ちえん', romaji: 'Chien', german: 'Verspätung', category: 'Flughafen' },
  { japanese: '乗る', hiragana: 'のる', romaji: 'Noru', german: 'einsteigen / nehmen', category: 'Flughafen' },
  { japanese: '降りる', hiragana: 'おりる', romaji: 'Oriru', german: 'aussteigen', category: 'Flughafen' },
  { japanese: '確認する', hiragana: 'かくにんする', romaji: 'Kakunin suru', german: 'bestätigen / überprüfen', category: 'Flughafen' },
  { japanese: 'パスポートを見せてください。', hiragana: 'パスポートをみせてください。', romaji: 'Pasupooto wo misete kudasai.', german: 'Zeigen Sie bitte Ihren Pass.', category: 'Flughafen' },
  { japanese: '何番ゲートですか？', hiragana: 'なんばんゲートですか？', romaji: 'Nanban geeto desu ka?', german: 'Welches Gate ist es?', category: 'Flughafen' },
  { japanese: '荷物を預けてください。', hiragana: 'にもつをあずけてください。', romaji: 'Nimotsu wo azukete kudasai.', german: 'Bitte geben Sie Ihr Gepäck auf.', category: 'Flughafen' },
  { japanese: 'フライトは遅延しています。', hiragana: 'フライトはちえんしています。', romaji: 'Furaito wa chien shite imasu.', german: 'Der Flug hat Verspätung.', category: 'Flughafen' },
  { japanese: '搭乗は何時ですか？', hiragana: 'とうじょうはなんじですか？', romaji: 'Toujou wa nanji desu ka?', german: 'Um wie viel Uhr ist das Boarding?', category: 'Flughafen' },

  // ═══════════════════════════════════════════════════════
  // BAHNHOF
  // ═══════════════════════════════════════════════════════
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: 'Bahnhof' },
  { japanese: '電車', hiragana: 'でんしゃ', romaji: 'Densha', german: 'Zug / U-Bahn', category: 'Bahnhof' },
  { japanese: '切符', hiragana: 'きっぷ', romaji: 'Kippu', german: 'Fahrkarte / Ticket', category: 'Bahnhof' },
  { japanese: 'ホーム', hiragana: 'ホーム', romaji: 'Hoomu', german: 'Bahnsteig', category: 'Bahnhof' },
  { japanese: '乗り換え', hiragana: 'のりかえ', romaji: 'Norikae', german: 'Umstieg / Umsteigen', category: 'Bahnhof' },
  { japanese: '急行', hiragana: 'きゅうこう', romaji: 'Kyuukou', german: 'Schnellzug / Express', category: 'Bahnhof' },
  { japanese: '普通', hiragana: 'ふつう', romaji: 'Futsuu', german: 'Nahverkehrszug / Normal', category: 'Bahnhof' },
  { japanese: '新幹線', hiragana: 'しんかんせん', romaji: 'Shinkansen', german: 'Shinkansen (Hochgeschwindigkeitszug)', category: 'Bahnhof' },
  { japanese: '終電', hiragana: 'しゅうでん', romaji: 'Shuuden', german: 'Letzter Zug', category: 'Bahnhof' },
  { japanese: '〜行き', hiragana: 'ゆき', romaji: '~yuki', german: 'Richtung ~ / nach ~', category: 'Bahnhof' },
  { japanese: '改札', hiragana: 'かいさつ', romaji: 'Kaisatsu', german: 'Sperre / Ticketkontrolle', category: 'Bahnhof' },
  { japanese: '路線', hiragana: 'ろせん', romaji: 'Rosen', german: 'Linie / Strecke', category: 'Bahnhof' },
  { japanese: '待つ', hiragana: 'まつ', romaji: 'Matsu', german: 'warten', category: 'Bahnhof' },
  { japanese: '乗る', hiragana: 'のる', romaji: 'Noru', german: 'einsteigen', category: 'Bahnhof' },
  { japanese: '降りる', hiragana: 'おりる', romaji: 'Oriru', german: 'aussteigen', category: 'Bahnhof' },
  { japanese: '〜まで切符を一枚ください。', hiragana: 'まできっぷをいちまいください。', romaji: '~ made kippu wo ichimai kudasai.', german: 'Eine Fahrkarte nach ~ bitte.', category: 'Bahnhof' },
  { japanese: '何番ホームですか？', hiragana: 'なんばんホームですか？', romaji: 'Nanban hoomu desu ka?', german: 'Welcher Bahnsteig ist es?', category: 'Bahnhof' },
  { japanese: '次の電車は何時ですか？', hiragana: 'つぎのでんしゃはなんじですか？', romaji: 'Tsugi no densha wa nanji desu ka?', german: 'Wann kommt der nächste Zug?', category: 'Bahnhof' },
  { japanese: 'この電車は〜に止まりますか？', hiragana: 'このでんしゃはにとまりますか？', romaji: 'Kono densha wa ~ ni tomarimasu ka?', german: 'Hält dieser Zug in ~?', category: 'Bahnhof' },
  { japanese: 'どこで乗り換えますか？', hiragana: 'どこでのりかえますか？', romaji: 'Doko de norikaemasu ka?', german: 'Wo muss ich umsteigen?', category: 'Bahnhof' },

  // ═══════════════════════════════════════════════════════
  // KLEIDUNG
  // ═══════════════════════════════════════════════════════
  { japanese: 'シャツ', hiragana: 'シャツ', romaji: 'Shatsu', german: 'Hemd / Shirt', category: 'Kleidung' },
  { japanese: 'Tシャツ', hiragana: 'ティーシャツ', romaji: 'Tii-shatsu', german: 'T-Shirt', category: 'Kleidung' },
  { japanese: 'ズボン', hiragana: 'ズボン', romaji: 'Zubon', german: 'Hose', category: 'Kleidung' },
  { japanese: 'スカート', hiragana: 'スカート', romaji: 'Sukaato', german: 'Rock', category: 'Kleidung' },
  { japanese: 'ドレス', hiragana: 'ドレス', romaji: 'Doresu', german: 'Kleid', category: 'Kleidung' },
  { japanese: 'コート', hiragana: 'コート', romaji: 'Kooto', german: 'Mantel', category: 'Kleidung' },
  { japanese: 'ジャケット', hiragana: 'ジャケット', romaji: 'Jaketto', german: 'Jacke', category: 'Kleidung' },
  { japanese: 'セーター', hiragana: 'セーター', romaji: 'Seetaa', german: 'Pullover / Strickjacke', category: 'Kleidung' },
  { japanese: '靴', hiragana: 'くつ', romaji: 'Kutsu', german: 'Schuhe', category: 'Kleidung' },
  { japanese: '靴下', hiragana: 'くつした', romaji: 'Kutsushita', german: 'Socken', category: 'Kleidung' },
  { japanese: '帽子', hiragana: 'ぼうし', romaji: 'Boushi', german: 'Hut / Mütze', category: 'Kleidung' },
  { japanese: 'バッグ', hiragana: 'バッグ', romaji: 'Baggu', german: 'Tasche', category: 'Kleidung' },
  { japanese: '手袋', hiragana: 'てぶくろ', romaji: 'Tebukuro', german: 'Handschuhe', category: 'Kleidung' },
  { japanese: 'マフラー', hiragana: 'マフラー', romaji: 'Mafuraa', german: 'Schal', category: 'Kleidung' },
  { japanese: 'サイズ', hiragana: 'サイズ', romaji: 'Saizu', german: 'Größe', category: 'Kleidung' },
  { japanese: '着る', hiragana: 'きる', romaji: 'Kiru', german: 'anziehen (Oberteil)', category: 'Kleidung' },
  { japanese: '履く', hiragana: 'はく', romaji: 'Haku', german: 'anziehen (Hose/Schuhe)', category: 'Kleidung' },
  { japanese: '脱ぐ', hiragana: 'ぬぐ', romaji: 'Nugu', german: 'ausziehen', category: 'Kleidung' },
  { japanese: '似合う', hiragana: 'にあう', romaji: 'Niau', german: 'stehen / gut passen', category: 'Kleidung' },
  { japanese: '茶色', hiragana: 'ちゃいろ', romaji: 'Chairo', german: 'braun', category: 'Kleidung' },
  { japanese: 'ピンク', hiragana: 'ピンク', romaji: 'Pinku', german: 'rosa / pink', category: 'Kleidung' },
  { japanese: '紫', hiragana: 'むらさき', romaji: 'Murasaki', german: 'lila / violett', category: 'Kleidung' },
  { japanese: '試着してもいいですか？', hiragana: 'しちゃくしてもいいですか？', romaji: 'Shichaku shite mo ii desu ka?', german: 'Darf ich das anprobieren?', category: 'Kleidung' },
  { japanese: 'Mサイズはありますか？', hiragana: 'えむサイズはありますか？', romaji: 'Emu saizu wa arimasu ka?', german: 'Haben Sie das in Größe M?', category: 'Kleidung' },
  { japanese: 'ちょっと大きすぎます。', hiragana: 'ちょっとおおきすぎます。', romaji: 'Chotto ooki sugimasu.', german: 'Es ist etwas zu groß.', category: 'Kleidung' },
  { japanese: 'この色が好きです。', hiragana: 'このいろがすきです。', romaji: 'Kono iro ga suki desu.', german: 'Diese Farbe gefällt mir.', category: 'Kleidung' },

  // ═══════════════════════════════════════════════════════
  // ARZT
  // ═══════════════════════════════════════════════════════
  { japanese: '病院', hiragana: 'びょういん', romaji: 'Byouin', german: 'Krankenhaus', category: 'Arzt' },
  { japanese: '医者', hiragana: 'いしゃ', romaji: 'Isha', german: 'Arzt', category: 'Arzt' },
  { japanese: '看護師', hiragana: 'かんごし', romaji: 'Kangoshi', german: 'Krankenschwester / Pfleger', category: 'Arzt' },
  { japanese: '薬', hiragana: 'くすり', romaji: 'Kusuri', german: 'Medizin / Arznei', category: 'Arzt' },
  { japanese: '頭', hiragana: 'あたま', romaji: 'Atama', german: 'Kopf', category: 'Arzt' },
  { japanese: '目', hiragana: 'め', romaji: 'Me', german: 'Auge', category: 'Arzt' },
  { japanese: '耳', hiragana: 'みみ', romaji: 'Mimi', german: 'Ohr', category: 'Arzt' },
  { japanese: '鼻', hiragana: 'はな', romaji: 'Hana', german: 'Nase', category: 'Arzt' },
  { japanese: '口', hiragana: 'くち', romaji: 'Kuchi', german: 'Mund', category: 'Arzt' },
  { japanese: '歯', hiragana: 'は', romaji: 'Ha', german: 'Zahn', category: 'Arzt' },
  { japanese: '首', hiragana: 'くび', romaji: 'Kubi', german: 'Hals / Nacken', category: 'Arzt' },
  { japanese: '肩', hiragana: 'かた', romaji: 'Kata', german: 'Schulter', category: 'Arzt' },
  { japanese: 'お腹', hiragana: 'おなか', romaji: 'Onaka', german: 'Bauch', category: 'Arzt' },
  { japanese: '背中', hiragana: 'せなか', romaji: 'Senaka', german: 'Rücken', category: 'Arzt' },
  { japanese: '足', hiragana: 'あし', romaji: 'Ashi', german: 'Fuß / Bein', category: 'Arzt' },
  { japanese: '手', hiragana: 'て', romaji: 'Te', german: 'Hand', category: 'Arzt' },
  { japanese: '痛い', hiragana: 'いたい', romaji: 'Itai', german: 'schmerzhaft / es tut weh', category: 'Arzt' },
  { japanese: '熱', hiragana: 'ねつ', romaji: 'Netsu', german: 'Fieber', category: 'Arzt' },
  { japanese: '風邪', hiragana: 'かぜ', romaji: 'Kaze', german: 'Erkältung', category: 'Arzt' },
  { japanese: '咳', hiragana: 'せき', romaji: 'Seki', german: 'Husten', category: 'Arzt' },
  { japanese: '鼻水', hiragana: 'はなみず', romaji: 'Hanamizu', german: 'Schnupfen / Laufende Nase', category: 'Arzt' },
  { japanese: '頭痛', hiragana: 'ずつう', romaji: 'Zutsuu', german: 'Kopfschmerzen', category: 'Arzt' },
  { japanese: '腹痛', hiragana: 'ふくつう', romaji: 'Fukutsuu', german: 'Bauchschmerzen', category: 'Arzt' },
  { japanese: '保険', hiragana: 'ほけん', romaji: 'Hoken', german: 'Versicherung', category: 'Arzt' },
  { japanese: '救急', hiragana: 'きゅうきゅう', romaji: 'Kyuukyuu', german: 'Notfall / Erste Hilfe', category: 'Arzt' },
  { japanese: '治る', hiragana: 'なおる', romaji: 'Naoru', german: 'gesund werden / heilen', category: 'Arzt' },
  { japanese: '〜が痛いです。', hiragana: 'がいたいです。', romaji: '~ ga itai desu.', german: '~ tut mir weh.', category: 'Arzt' },
  { japanese: '熱があります。', hiragana: 'ねつがあります。', romaji: 'Netsu ga arimasu.', german: 'Ich habe Fieber.', category: 'Arzt' },
  { japanese: '薬をください。', hiragana: 'くすりをください。', romaji: 'Kusuri wo kudasai.', german: 'Geben Sie mir bitte Medizin.', category: 'Arzt' },
  { japanese: '保険証はありますか？', hiragana: 'ほけんしょうはありますか？', romaji: 'Hokenshou wa arimasu ka?', german: 'Haben Sie Ihre Versicherungskarte?', category: 'Arzt' },
  { japanese: '早く良くなってください。', hiragana: 'はやくよくなってください。', romaji: 'Hayaku yoku natte kudasai.', german: 'Werden Sie schnell wieder gesund.', category: 'Arzt' },

  // ═══════════════════════════════════════════════════════
  // SMALLTALK
  // ═══════════════════════════════════════════════════════
  { japanese: 'お元気ですか？', hiragana: 'おげんきですか？', romaji: 'Ogenki desu ka?', german: 'Wie geht es Ihnen?', category: 'Smalltalk' },
  { japanese: '元気です', hiragana: 'げんきです', romaji: 'Genki desu', german: 'Mir geht es gut', category: 'Smalltalk' },
  { japanese: 'まあまあです', hiragana: 'まあまあです', romaji: 'Maa maa desu', german: 'So lala / Geht so', category: 'Smalltalk' },
  { japanese: '忙しい', hiragana: 'いそがしい', romaji: 'Isogashii', german: 'beschäftigt / busy', category: 'Smalltalk' },
  { japanese: '暇', hiragana: 'ひま', romaji: 'Hima', german: 'frei / Zeit haben', category: 'Smalltalk' },
  { japanese: '最近', hiragana: 'さいきん', romaji: 'Saikin', german: 'neuerdings / letztens', category: 'Smalltalk' },
  { japanese: 'そうですね', hiragana: 'そうですね', romaji: 'Sou desu ne', german: 'Das stimmt / Ja, wirklich', category: 'Smalltalk' },
  { japanese: '本当に', hiragana: 'ほんとうに', romaji: 'Hontou ni', german: 'wirklich / tatsächlich', category: 'Smalltalk' },
  { japanese: 'なるほど', hiragana: 'なるほど', romaji: 'Naruhodo', german: 'Ach so / Verstehe', category: 'Smalltalk' },
  { japanese: 'すごい', hiragana: 'すごい', romaji: 'Sugoi', german: 'toll / wow / großartig', category: 'Smalltalk' },
  { japanese: 'いいですね', hiragana: 'いいですね', romaji: 'Ii desu ne', german: 'Das ist schön / Prima', category: 'Smalltalk' },
  { japanese: '好き', hiragana: 'すき', romaji: 'Suki', german: 'mögen / gefällt mir', category: 'Smalltalk' },
  { japanese: '嫌い', hiragana: 'きらい', romaji: 'Kirai', german: 'nicht mögen', category: 'Smalltalk' },
  { japanese: '得意', hiragana: 'とくい', romaji: 'Tokui', german: 'gut können / Stärke', category: 'Smalltalk' },
  { japanese: '苦手', hiragana: 'にがて', romaji: 'Nigate', german: 'Schwäche / nicht gut können', category: 'Smalltalk' },
  { japanese: '映画', hiragana: 'えいが', romaji: 'Eiga', german: 'Film / Kino', category: 'Smalltalk' },
  { japanese: '音楽', hiragana: 'おんがく', romaji: 'Ongaku', german: 'Musik', category: 'Smalltalk' },
  { japanese: '旅行', hiragana: 'りょこう', romaji: 'Ryokou', german: 'Reise', category: 'Smalltalk' },
  { japanese: 'スポーツ', hiragana: 'スポーツ', romaji: 'Supootsu', german: 'Sport', category: 'Smalltalk' },
  { japanese: '読書', hiragana: 'どくしょ', romaji: 'Dokusho', german: 'Lesen (Hobby)', category: 'Smalltalk' },
  { japanese: '趣味は何ですか？', hiragana: 'しゅみはなんですか？', romaji: 'Shumi wa nan desu ka?', german: 'Was sind Ihre Hobbys?', category: 'Smalltalk' },
  { japanese: '日本語が上手ですね。', hiragana: 'にほんごがじょうずですね。', romaji: 'Nihongo ga jouzu desu ne.', german: 'Ihr Japanisch ist sehr gut.', category: 'Smalltalk' },
  { japanese: '日本は初めてですか？', hiragana: 'にほんははじめてですか？', romaji: 'Nihon wa hajimete desu ka?', german: 'Ist das Ihr erster Besuch in Japan?', category: 'Smalltalk' },
  { japanese: '日本の食べ物は好きですか？', hiragana: 'にほんのたべものはすきですか？', romaji: 'Nihon no tabemono wa suki desu ka?', german: 'Mögen Sie japanisches Essen?', category: 'Smalltalk' },

  // ═══════════════════════════════════════════════════════
  // ZAHLEN
  // ═══════════════════════════════════════════════════════
  { japanese: '零 / ゼロ', hiragana: 'れい / ゼロ', romaji: 'Rei / Zero', german: 'Null', category: 'Zahlen' },
  { japanese: '一', hiragana: 'いち', romaji: 'Ichi', german: 'Eins', category: 'Zahlen' },
  { japanese: '二', hiragana: 'に', romaji: 'Ni', german: 'Zwei', category: 'Zahlen' },
  { japanese: '三', hiragana: 'さん', romaji: 'San', german: 'Drei', category: 'Zahlen' },
  { japanese: '四', hiragana: 'し / よん', romaji: 'Shi / Yon', german: 'Vier', category: 'Zahlen' },
  { japanese: '五', hiragana: 'ご', romaji: 'Go', german: 'Fünf', category: 'Zahlen' },
  { japanese: '六', hiragana: 'ろく', romaji: 'Roku', german: 'Sechs', category: 'Zahlen' },
  { japanese: '七', hiragana: 'しち / なな', romaji: 'Shichi / Nana', german: 'Sieben', category: 'Zahlen' },
  { japanese: '八', hiragana: 'はち', romaji: 'Hachi', german: 'Acht', category: 'Zahlen' },
  { japanese: '九', hiragana: 'く / きゅう', romaji: 'Ku / Kyuu', german: 'Neun', category: 'Zahlen' },
  { japanese: '十', hiragana: 'じゅう', romaji: 'Juu', german: 'Zehn', category: 'Zahlen' },
  { japanese: '百', hiragana: 'ひゃく', romaji: 'Hyaku', german: 'Hundert', category: 'Zahlen' },
  { japanese: '千', hiragana: 'せん', romaji: 'Sen', german: 'Tausend', category: 'Zahlen' },
  { japanese: '万', hiragana: 'まん', romaji: 'Man', german: 'Zehntausend', category: 'Zahlen' },
  { japanese: '〜枚', hiragana: 'まい', romaji: '~mai', german: '~ Stück (flach: Papier, Ticket)', category: 'Zahlen' },
  { japanese: '〜本', hiragana: 'ほん', romaji: '~hon', german: '~ Stück (lang: Flasche, Stift)', category: 'Zahlen' },
  { japanese: '〜杯', hiragana: 'はい', romaji: '~hai', german: '~ Becher / Gläser', category: 'Zahlen' },
  { japanese: '〜匹', hiragana: 'ひき', romaji: '~hiki', german: '~ Tiere (klein)', category: 'Zahlen' },
  { japanese: '〜台', hiragana: 'だい', romaji: '~dai', german: '~ Fahrzeuge / Geräte', category: 'Zahlen' },
  { japanese: '〜冊', hiragana: 'さつ', romaji: '~satsu', german: '~ Bücher / Hefte', category: 'Zahlen' },
  { japanese: '〜人', hiragana: 'にん', romaji: '~nin', german: '~ Personen', category: 'Zahlen' },
  { japanese: '〜個', hiragana: 'こ', romaji: '~ko', german: '~ Stück (allgemein)', category: 'Zahlen' },
  { japanese: 'いくら', hiragana: 'いくら', romaji: 'Ikura', german: 'Wie viel (Geld)', category: 'Zahlen' },
  { japanese: 'いくつ', hiragana: 'いくつ', romaji: 'Ikutsu', german: 'Wie viele', category: 'Zahlen' },
  { japanese: '全部でいくらですか？', hiragana: 'ぜんぶでいくらですか？', romaji: 'Zenbu de ikura desu ka?', german: 'Wie viel kostet das insgesamt?', category: 'Zahlen' },
  { japanese: '三枚ください。', hiragana: 'さんまいください。', romaji: 'Sanmai kudasai.', german: 'Drei Stück bitte.', category: 'Zahlen' },

  // ═══════════════════════════════════════════════════════
  // UHRZEIT
  // ═══════════════════════════════════════════════════════
  { japanese: '〜時', hiragana: 'じ', romaji: '~ji', german: '~ Uhr', category: 'Uhrzeit' },
  { japanese: '〜分', hiragana: 'ふん / ぷん', romaji: '~fun / ~pun', german: '~ Minuten', category: 'Uhrzeit' },
  { japanese: '午前', hiragana: 'ごぜん', romaji: 'Gozen', german: 'Vormittag / AM', category: 'Uhrzeit' },
  { japanese: '午後', hiragana: 'ごご', romaji: 'Gogo', german: 'Nachmittag / PM', category: 'Uhrzeit' },
  { japanese: '半', hiragana: 'はん', romaji: 'Han', german: 'Halb (z.B. 3:30)', category: 'Uhrzeit' },
  { japanese: '今', hiragana: 'いま', romaji: 'Ima', german: 'jetzt', category: 'Uhrzeit' },
  { japanese: '朝', hiragana: 'あさ', romaji: 'Asa', german: 'Morgen (Tageszeit)', category: 'Uhrzeit' },
  { japanese: '昼', hiragana: 'ひる', romaji: 'Hiru', german: 'Mittag', category: 'Uhrzeit' },
  { japanese: '夕方', hiragana: 'ゆうがた', romaji: 'Yuugata', german: 'Abend (früher Abend)', category: 'Uhrzeit' },
  { japanese: '夜', hiragana: 'よる', romaji: 'Yoru', german: 'Nacht / Abend', category: 'Uhrzeit' },
  { japanese: '〜時に', hiragana: 'じに', romaji: '~ji ni', german: 'Um ~ Uhr', category: 'Uhrzeit' },
  { japanese: '〜時ごろ', hiragana: 'じごろ', romaji: '~ji goro', german: 'Gegen ~ Uhr', category: 'Uhrzeit' },
  { japanese: '何時', hiragana: 'なんじ', romaji: 'Nanji', german: 'Wie viel Uhr', category: 'Uhrzeit' },
  { japanese: '今、何時ですか？', hiragana: 'いま、なんじですか？', romaji: 'Ima, nanji desu ka?', german: 'Wie viel Uhr ist es jetzt?', category: 'Uhrzeit' },
  { japanese: '三時半です。', hiragana: 'さんじはんです。', romaji: 'Sanji han desu.', german: 'Es ist halb vier (3:30).', category: 'Uhrzeit' },
  { japanese: '午後六時に会いましょう。', hiragana: 'ごごろくじにあいましょう。', romaji: 'Gogo rokuji ni aimashou.', german: 'Treffen wir uns um 18 Uhr.', category: 'Uhrzeit' },

  // ═══════════════════════════════════════════════════════
  // DATUM
  // ═══════════════════════════════════════════════════════
  { japanese: '今日', hiragana: 'きょう', romaji: 'Kyou', german: 'heute', category: 'Datum' },
  { japanese: '明日', hiragana: 'あした', romaji: 'Ashita', german: 'morgen', category: 'Datum' },
  { japanese: '昨日', hiragana: 'きのう', romaji: 'Kinou', german: 'Gestern', category: 'Datum' },
  { japanese: '今週', hiragana: 'こんしゅう', romaji: 'Konshuu', german: 'Diese Woche', category: 'Datum' },
  { japanese: '来週', hiragana: 'らいしゅう', romaji: 'Raishuu', german: 'Nächste Woche', category: 'Datum' },
  { japanese: '先週', hiragana: 'せんしゅう', romaji: 'Senshuu', german: 'Letzte Woche', category: 'Datum' },
  { japanese: '今月', hiragana: 'こんげつ', romaji: 'Kongetsu', german: 'Diesen Monat', category: 'Datum' },
  { japanese: '来月', hiragana: 'らいげつ', romaji: 'Raigetsu', german: 'Nächsten Monat', category: 'Datum' },
  { japanese: '今年', hiragana: 'ことし', romaji: 'Kotoshi', german: 'Dieses Jahr', category: 'Datum' },
  { japanese: '来年', hiragana: 'らいねん', romaji: 'Rainen', german: 'Nächstes Jahr', category: 'Datum' },
  { japanese: '一月', hiragana: 'いちがつ', romaji: 'Ichigatsu', german: 'Januar', category: 'Datum' },
  { japanese: '二月', hiragana: 'にがつ', romaji: 'Nigatsu', german: 'Februar', category: 'Datum' },
  { japanese: '三月', hiragana: 'さんがつ', romaji: 'Sangatsu', german: 'März', category: 'Datum' },
  { japanese: '四月', hiragana: 'しがつ', romaji: 'Shigatsu', german: 'April', category: 'Datum' },
  { japanese: '五月', hiragana: 'ごがつ', romaji: 'Gogatsu', german: 'Mai', category: 'Datum' },
  { japanese: '六月', hiragana: 'ろくがつ', romaji: 'Rokugatsu', german: 'Juni', category: 'Datum' },
  { japanese: '七月', hiragana: 'しちがつ', romaji: 'Shichigatsu', german: 'Juli', category: 'Datum' },
  { japanese: '八月', hiragana: 'はちがつ', romaji: 'Hachigatsu', german: 'August', category: 'Datum' },
  { japanese: '九月', hiragana: 'くがつ', romaji: 'Kugatsu', german: 'September', category: 'Datum' },
  { japanese: '十月', hiragana: 'じゅうがつ', romaji: 'Juugatsu', german: 'Oktober', category: 'Datum' },
  { japanese: '十一月', hiragana: 'じゅういちがつ', romaji: 'Juuichigatsu', german: 'November', category: 'Datum' },
  { japanese: '十二月', hiragana: 'じゅうにがつ', romaji: 'Juunigatsu', german: 'Dezember', category: 'Datum' },
  { japanese: '誕生日', hiragana: 'たんじょうび', romaji: 'Tanjoubi', german: 'Geburtstag', category: 'Datum' },
  { japanese: '今日は何日ですか？', hiragana: 'きょうはなんにちですか？', romaji: 'Kyou wa nan nichi desu ka?', german: 'Der Wievielte ist heute?', category: 'Datum' },
  { japanese: '誕生日はいつですか？', hiragana: 'たんじょうびはいつですか？', romaji: 'Tanjoubi wa itsu desu ka?', german: 'Wann haben Sie Geburtstag?', category: 'Datum' },

  // ═══════════════════════════════════════════════════════
  // WOCHENTAGE
  // ═══════════════════════════════════════════════════════
  { japanese: '月曜日', hiragana: 'げつようび', romaji: 'Getsuyoubi', german: 'Montag', category: 'Wochentage' },
  { japanese: '火曜日', hiragana: 'かようび', romaji: 'Kayoubi', german: 'Dienstag', category: 'Wochentage' },
  { japanese: '水曜日', hiragana: 'すいようび', romaji: 'Suiyoubi', german: 'Mittwoch', category: 'Wochentage' },
  { japanese: '木曜日', hiragana: 'もくようび', romaji: 'Mokuyoubi', german: 'Donnerstag', category: 'Wochentage' },
  { japanese: '金曜日', hiragana: 'きんようび', romaji: 'Kin\'youbi', german: 'Freitag', category: 'Wochentage' },
  { japanese: '土曜日', hiragana: 'どようび', romaji: 'Doyoubi', german: 'Samstag', category: 'Wochentage' },
  { japanese: '日曜日', hiragana: 'にちようび', romaji: 'Nichiyoubi', german: 'Sonntag', category: 'Wochentage' },
  { japanese: '週末', hiragana: 'しゅうまつ', romaji: 'Shuumatsu', german: 'Wochenende', category: 'Wochentage' },
  { japanese: '平日', hiragana: 'へいじつ', romaji: 'Heijitsu', german: 'Werktag', category: 'Wochentage' },
  { japanese: '休み', hiragana: 'やすみ', romaji: 'Yasumi', german: 'frei / Urlaub / Pause', category: 'Wochentage' },
  { japanese: '毎週', hiragana: 'まいしゅう', romaji: 'Maishuu', german: 'Jede Woche', category: 'Wochentage' },
  { japanese: '今日は何曜日ですか？', hiragana: 'きょうはなんようびですか？', romaji: 'Kyou wa nan youbi desu ka?', german: 'Welcher Wochentag ist heute?', category: 'Wochentage' },
  { japanese: '金曜日に映画を見ます。', hiragana: 'きんようびにえいがをみます。', romaji: 'Kin\'youbi ni eiga wo mimasu.', german: 'Am Freitag schaue ich einen Film.', category: 'Wochentage' },
  { japanese: '土曜日と日曜日は休みです。', hiragana: 'どようびとにちようびはやすみです。', romaji: 'Doyoubi to nichiyoubi wa yasumi desu.', german: 'Samstag und Sonntag sind frei.', category: 'Wochentage' },

  // ═══════════════════════════════════════════════════════
  // ZEITDAUER
  // ═══════════════════════════════════════════════════════
  { japanese: '〜時間', hiragana: 'じかん', romaji: '~jikan', german: '~ Stunden', category: 'Zeitdauer' },
  { japanese: '〜分', hiragana: 'ふん / ぷん', romaji: '~fun / ~pun', german: '~ Minuten', category: 'Zeitdauer' },
  { japanese: '〜秒', hiragana: 'びょう', romaji: '~byou', german: '~ Sekunden', category: 'Zeitdauer' },
  { japanese: '〜日間', hiragana: 'にちかん', romaji: '~nichikan', german: '~ Tage (Dauer)', category: 'Zeitdauer' },
  { japanese: '〜週間', hiragana: 'しゅうかん', romaji: '~shuukan', german: '~ Wochen', category: 'Zeitdauer' },
  { japanese: '〜ヶ月', hiragana: 'かげつ', romaji: '~kagetsu', german: '~ Monate', category: 'Zeitdauer' },
  { japanese: '〜年間', hiragana: 'ねんかん', romaji: '~nenkan', german: '~ Jahre (Dauer)', category: 'Zeitdauer' },
  { japanese: 'どのくらい', hiragana: 'どのくらい', romaji: 'Dono kurai', german: 'Wie lange / Wie viel', category: 'Zeitdauer' },
  { japanese: 'かかる', hiragana: 'かかる', romaji: 'Kakaru', german: 'dauern / kosten', category: 'Zeitdauer' },
  { japanese: 'まだ', hiragana: 'まだ', romaji: 'Mada', german: 'Noch / Immer noch', category: 'Zeitdauer' },
  { japanese: 'もう', hiragana: 'もう', romaji: 'Mou', german: 'Schon / Bereits', category: 'Zeitdauer' },
  { japanese: 'ずっと', hiragana: 'ずっと', romaji: 'Zutto', german: 'Die ganze Zeit / Immer', category: 'Zeitdauer' },
  { japanese: 'しばらく', hiragana: 'しばらく', romaji: 'Shibaraku', german: 'Eine Weile', category: 'Zeitdauer' },
  { japanese: 'どのくらいかかりますか？', hiragana: 'どのくらいかかりますか？', romaji: 'Dono kurai kakarimasu ka?', german: 'Wie lange dauert es?', category: 'Zeitdauer' },
  { japanese: '三時間かかります。', hiragana: 'さんじかんかかります。', romaji: 'Sanjikan kakarimasu.', german: 'Es dauert drei Stunden.', category: 'Zeitdauer' },
  { japanese: '五分待ってください。', hiragana: 'ごふんまってください。', romaji: 'Gofun matte kudasai.', german: 'Bitte warten Sie fünf Minuten.', category: 'Zeitdauer' },

  // ═══════════════════════════════════════════════════════
  // FAMILIE
  // ═══════════════════════════════════════════════════════
  { japanese: '家族', hiragana: 'かぞく', romaji: 'Kazoku', german: 'Familie', category: 'Familie' },
  { japanese: '両親', hiragana: 'りょうしん', romaji: 'Ryoushin', german: 'Eltern', category: 'Familie' },
  { japanese: '父', hiragana: 'ちち', romaji: 'Chichi', german: 'Vater (eigener)', category: 'Familie' },
  { japanese: 'お父さん', hiragana: 'おとうさん', romaji: 'Otousan', german: 'Vater (angesprochen)', category: 'Familie' },
  { japanese: '母', hiragana: 'はは', romaji: 'Haha', german: 'Mutter (eigene)', category: 'Familie' },
  { japanese: 'お母さん', hiragana: 'おかあさん', romaji: 'Okaasan', german: 'Mutter (angesprochen)', category: 'Familie' },
  { japanese: '兄', hiragana: 'あに', romaji: 'Ani', german: 'Älterer Bruder (eigener)', category: 'Familie' },
  { japanese: 'お兄さん', hiragana: 'おにいさん', romaji: 'Oniisan', german: 'Älterer Bruder (angesprochen)', category: 'Familie' },
  { japanese: '姉', hiragana: 'あね', romaji: 'Ane', german: 'Ältere Schwester (eigene)', category: 'Familie' },
  { japanese: 'お姉さん', hiragana: 'おねえさん', romaji: 'Oneesan', german: 'Ältere Schwester (angesprochen)', category: 'Familie' },
  { japanese: '弟', hiragana: 'おとうと', romaji: 'Otouto', german: 'Jüngerer Bruder', category: 'Familie' },
  { japanese: '妹', hiragana: 'いもうと', romaji: 'Imouto', german: 'Jüngere Schwester', category: 'Familie' },
  { japanese: '祖父', hiragana: 'そふ', romaji: 'Sofu', german: 'Großvater (eigener)', category: 'Familie' },
  { japanese: 'おじいさん', hiragana: 'おじいさん', romaji: 'Ojiisan', german: 'Großvater (angesprochen)', category: 'Familie' },
  { japanese: '祖母', hiragana: 'そぼ', romaji: 'Sobo', german: 'Großmutter (eigene)', category: 'Familie' },
  { japanese: 'おばあさん', hiragana: 'おばあさん', romaji: 'Obaasan', german: 'Großmutter (angesprochen)', category: 'Familie' },
  { japanese: '夫', hiragana: 'おっと', romaji: 'Otto', german: 'Ehemann (eigener)', category: 'Familie' },
  { japanese: '妻', hiragana: 'つま', romaji: 'Tsuma', german: 'Ehefrau (eigene)', category: 'Familie' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind / Kinder', category: 'Familie' },
  { japanese: '息子', hiragana: 'むすこ', romaji: 'Musuko', german: 'Sohn', category: 'Familie' },
  { japanese: '娘', hiragana: 'むすめ', romaji: 'Musume', german: 'Tochter', category: 'Familie' },
  { japanese: '家族は何人ですか？', hiragana: 'かぞくはなんにんですか？', romaji: 'Kazoku wa nannin desu ka?', german: 'Wie viele Personen hat Ihre Familie?', category: 'Familie' },
  { japanese: '兄は大学生です。', hiragana: 'あにはだいがくせいです。', romaji: 'Ani wa daigakusei desu.', german: 'Mein älterer Bruder ist Student.', category: 'Familie' },
  { japanese: '両親は東京に住んでいます。', hiragana: 'りょうしんはとうきょうにすんでいます。', romaji: 'Ryoushin wa Toukyou ni sunde imasu.', german: 'Meine Eltern wohnen in Tokio.', category: 'Familie' },
  { japanese: '妹は小学生です。', hiragana: 'いもうとはしょうがくせいです。', romaji: 'Imouto wa shougakusei desu.', german: 'Meine jüngere Schwester geht in die Grundschule.', category: 'Familie' },

  // ═══════════════════════════════════════════════════════
  // GEFÜHLE
  // ═══════════════════════════════════════════════════════
  { japanese: '嬉しい', hiragana: 'うれしい', romaji: 'Ureshii', german: 'froh / glücklich', category: 'Gefühle' },
  { japanese: '悲しい', hiragana: 'かなしい', romaji: 'Kanashii', german: 'traurig', category: 'Gefühle' },
  { japanese: '楽しい', hiragana: 'たのしい', romaji: 'Tanoshii', german: 'spaßig / fröhlich', category: 'Gefühle' },
  { japanese: '怖い', hiragana: 'こわい', romaji: 'Kowai', german: 'beängstigend / Angst haben', category: 'Gefühle' },
  { japanese: '怒る', hiragana: 'おこる', romaji: 'Okoru', german: 'wütend sein / ärgerlich', category: 'Gefühle' },
  { japanese: '驚く', hiragana: 'おどろく', romaji: 'Odoroku', german: 'überrascht sein', category: 'Gefühle' },
  { japanese: '恥ずかしい', hiragana: 'はずかしい', romaji: 'Hazukashii', german: 'verlegen / peinlich', category: 'Gefühle' },
  { japanese: '寂しい', hiragana: 'さびしい', romaji: 'Sabishii', german: 'einsam', category: 'Gefühle' },
  { japanese: '心配', hiragana: 'しんぱい', romaji: 'Shinpai', german: 'Sorge / Besorgnis', category: 'Gefühle' },
  { japanese: '大好き', hiragana: 'だいすき', romaji: 'Daisuki', german: 'sehr mögen / lieben', category: 'Gefühle' },
  { japanese: '大嫌い', hiragana: 'だいきらい', romaji: 'Daikirai', german: 'sehr hassen', category: 'Gefühle' },
  { japanese: '疲れた', hiragana: 'つかれた', romaji: 'Tsukareta', german: 'müde / erschöpft', category: 'Gefühle' },
  { japanese: '眠い', hiragana: 'ねむい', romaji: 'Nemui', german: 'schläfrig', category: 'Gefühle' },
  { japanese: '元気', hiragana: 'げんき', romaji: 'Genki', german: 'munter / wohlauf', category: 'Gefühle' },
  { japanese: '大丈夫', hiragana: 'だいじょうぶ', romaji: 'Daijoubu', german: 'In Ordnung / Alles gut', category: 'Gefühle' },
  { japanese: '頑張る', hiragana: 'がんばる', romaji: 'Ganbaru', german: 'sich anstrengen / weitermachen', category: 'Gefühle' },
  { japanese: 'びっくりした', hiragana: 'びっくりした', romaji: 'Bikkuri shita', german: 'erschrocken / überrascht', category: 'Gefühle' },
  { japanese: 'ストレスがある', hiragana: 'ストレスがある', romaji: 'Sutoresu ga aru', german: 'gestresst sein', category: 'Gefühle' },
  { japanese: '今日はとても疲れました。', hiragana: 'きょうはとてもつかれました。', romaji: 'Kyou wa totemo tsukaremashita.', german: 'Heute bin ich sehr müde.', category: 'Gefühle' },
  { japanese: '試験が心配です。', hiragana: 'しけんがしんぱいです。', romaji: 'Shiken ga shinpai desu.', german: 'Ich mache mir Sorgen um die Prüfung.', category: 'Gefühle' },
  { japanese: 'この映画はとても怖かったです。', hiragana: 'このえいがはとてもこわかったです。', romaji: 'Kono eiga wa totemo kowakatta desu.', german: 'Dieser Film war sehr gruselig.', category: 'Gefühle' },
  { japanese: '頑張ってください！', hiragana: 'がんばってください！', romaji: 'Ganbatte kudasai!', german: 'Geben Sie Ihr Bestes! / Viel Erfolg!', category: 'Gefühle' },

  // ═══════════════════════════════════════════════════════
  // WETTER
  // ═══════════════════════════════════════════════════════
  { japanese: '天気', hiragana: 'てんき', romaji: 'Tenki', german: 'Wetter', category: 'Wetter' },
  { japanese: '晴れ', hiragana: 'はれ', romaji: 'Hare', german: 'sonnig / klar', category: 'Wetter' },
  { japanese: '曇り', hiragana: 'くもり', romaji: 'Kumori', german: 'bewölkt', category: 'Wetter' },
  { japanese: '雨', hiragana: 'あめ', romaji: 'Ame', german: 'Regen', category: 'Wetter' },
  { japanese: '雪', hiragana: 'ゆき', romaji: 'Yuki', german: 'Schnee', category: 'Wetter' },
  { japanese: '風', hiragana: 'かぜ', romaji: 'Kaze', german: 'Wind', category: 'Wetter' },
  { japanese: '台風', hiragana: 'たいふう', romaji: 'Taifuu', german: 'Taifun', category: 'Wetter' },
  { japanese: '雷', hiragana: 'かみなり', romaji: 'Kaminari', german: 'Donner / Blitz', category: 'Wetter' },
  { japanese: '暑い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß', category: 'Wetter' },
  { japanese: '寒い', hiragana: 'さむい', romaji: 'Samui', german: 'kalt', category: 'Wetter' },
  { japanese: '涼しい', hiragana: 'すずしい', romaji: 'Suzushii', german: 'kühl', category: 'Wetter' },
  { japanese: '暖かい', hiragana: 'あたたかい', romaji: 'Atatakai', german: 'warm', category: 'Wetter' },
  { japanese: '傘', hiragana: 'かさ', romaji: 'Kasa', german: 'Regenschirm', category: 'Wetter' },
  { japanese: '天気予報', hiragana: 'てんきよほう', romaji: 'Tenki yohou', german: 'Wettervorhersage', category: 'Wetter' },
  { japanese: '春', hiragana: 'はる', romaji: 'Haru', german: 'Frühling', category: 'Wetter' },
  { japanese: '夏', hiragana: 'なつ', romaji: 'Natsu', german: 'Sommer', category: 'Wetter' },
  { japanese: '秋', hiragana: 'あき', romaji: 'Aki', german: 'Herbst', category: 'Wetter' },
  { japanese: '冬', hiragana: 'ふゆ', romaji: 'Fuyu', german: 'Winter', category: 'Wetter' },
  { japanese: '気温', hiragana: 'きおん', romaji: 'Kion', german: 'Temperatur / Lufttemperatur', category: 'Wetter' },
  { japanese: '今日はいい天気ですね。', hiragana: 'きょうはいいてんきですね。', romaji: 'Kyou wa ii tenki desu ne.', german: 'Heute ist schönes Wetter, nicht wahr?', category: 'Wetter' },
  { japanese: '明日は雨が降るかもしれません。', hiragana: 'あしたはあめがふるかもしれません。', romaji: 'Ashita wa ame ga furu kamo shiremasen.', german: 'Morgen könnte es regnen.', category: 'Wetter' },
  { japanese: '傘を持ってきてください。', hiragana: 'かさをもってきてください。', romaji: 'Kasa wo motte kite kudasai.', german: 'Bringen Sie bitte einen Regenschirm mit.', category: 'Wetter' },
  { japanese: '今日はとても暑いですね。', hiragana: 'きょうはとてもあついですね。', romaji: 'Kyou wa totemo atsui desu ne.', german: 'Heute ist es sehr heiß, nicht wahr?', category: 'Wetter' },
  { japanese: '強い', hiragana: 'つよい', romaji: 'Tsuyoi', german: 'stark', category: 'Wetter' },
  { japanese: '弱い', hiragana: 'よわい', romaji: 'Yowai', german: 'schwach / sanft', category: 'Wetter' },
  { japanese: '蒸し暑い', hiragana: 'むしあつい', romaji: 'Mushiatsui', german: 'schwül', category: 'Wetter' },
  { japanese: '空', hiragana: 'そら', romaji: 'Sora', german: 'Himmel', category: 'Wetter' },
  { japanese: '霧', hiragana: 'きり', romaji: 'Kiri', german: 'Nebel', category: 'Wetter' },

  // ═══════════════════════════════════════════════════════
  // ERGÄNZUNGEN: Verben, Adjektive & Substantive
  // ═══════════════════════════════════════════════════════

  // — Kennenlernen: Begrüßungen & Abschied —
  { japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'Ohayou gozaimasu', german: 'Guten Morgen (höflich)', category: 'Kennenlernen' },
  { japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'Konnichiwa', german: 'Guten Tag / Hallo', category: 'Kennenlernen' },
  { japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'Konbanwa', german: 'Guten Abend', category: 'Kennenlernen' },
  { japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'Oyasumi nasai', german: 'Gute Nacht', category: 'Kennenlernen' },
  { japanese: 'さようなら', hiragana: 'さようなら', romaji: 'Sayounara', german: 'Auf Wiedersehen', category: 'Kennenlernen' },
  { japanese: 'じゃあね', hiragana: 'じゃあね', romaji: 'Jaa ne', german: 'Tschüss / Bis bald', category: 'Kennenlernen' },
  { japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'Gomen nasai', german: 'Es tut mir leid', category: 'Kennenlernen' },
  { japanese: 'いただきます', hiragana: 'いただきます', romaji: 'Itadakimasu', german: 'Mahlzeit (vor dem Essen)', category: 'Kennenlernen' },
  { japanese: 'ごちそうさまでした', hiragana: 'ごちそうさまでした', romaji: 'Gochisousama deshita', german: 'Danke für das Essen', category: 'Kennenlernen' },
  { japanese: 'いってきます', hiragana: 'いってきます', romaji: 'Ittekimasu', german: 'Ich gehe jetzt (Abschied zu Hause)', category: 'Kennenlernen' },
  { japanese: 'ただいま', hiragana: 'ただいま', romaji: 'Tadaima', german: 'Ich bin zurück', category: 'Kennenlernen' },
  { japanese: '若い', hiragana: 'わかい', romaji: 'Wakai', german: 'jung', category: 'Kennenlernen' },
  { japanese: '親切', hiragana: 'しんせつ', romaji: 'Shinsetsu', german: 'freundlich / nett', category: 'Kennenlernen' },
  { japanese: '上手', hiragana: 'じょうず', romaji: 'Jouzu', german: 'gut in etwas (Können)', category: 'Kennenlernen' },
  { japanese: '下手', hiragana: 'へた', romaji: 'Heta', german: 'schlecht in etwas (Können)', category: 'Kennenlernen' },
  { japanese: '会う', hiragana: 'あう', romaji: 'Au', german: 'treffen / begegnen', category: 'Kennenlernen' },

  // — Restaurant: Adjektive & Verben —
  { japanese: '苦い', hiragana: 'にがい', romaji: 'Nigai', german: 'bitter', category: 'Restaurant' },
  { japanese: '塩辛い', hiragana: 'しおからい', romaji: 'Shiokarai', german: 'salzig', category: 'Restaurant' },
  { japanese: '酸っぱい', hiragana: 'すっぱい', romaji: 'Suppai', german: 'sauer', category: 'Restaurant' },
  { japanese: 'まずい', hiragana: 'まずい', romaji: 'Mazui', german: 'nicht lecker', category: 'Restaurant' },
  { japanese: '注文する', hiragana: 'ちゅうもんする', romaji: 'Chuumon suru', german: 'bestellen', category: 'Restaurant' },
  { japanese: '座る', hiragana: 'すわる', romaji: 'Suwaru', german: 'sich setzen / sitzen', category: 'Restaurant' },
  { japanese: '料理', hiragana: 'りょうり', romaji: 'Ryouri', german: 'Gericht / Kochen', category: 'Restaurant' },
  { japanese: '昼食', hiragana: 'ちゅうしょく', romaji: 'Chuushoku', german: 'Mittagessen', category: 'Restaurant' },
  { japanese: '夕食', hiragana: 'ゆうしょく', romaji: 'Yuushoku', german: 'Abendessen', category: 'Restaurant' },
  { japanese: '果物', hiragana: 'くだもの', romaji: 'Kudamono', german: 'Obst', category: 'Restaurant' },
  { japanese: 'コップ', hiragana: 'コップ', romaji: 'Koppu', german: 'Glas / Becher', category: 'Restaurant' },
  { japanese: '皿', hiragana: 'さら', romaji: 'Sara', german: 'Teller', category: 'Restaurant' },
  { japanese: '塩', hiragana: 'しお', romaji: 'Shio', german: 'Salz', category: 'Restaurant' },
  { japanese: '砂糖', hiragana: 'さとう', romaji: 'Satou', german: 'Zucker', category: 'Restaurant' },

  // — Einkaufen: Adjektive & Verben —
  { japanese: '新しい', hiragana: 'あたらしい', romaji: 'Atarashii', german: 'neu', category: 'Einkaufen' },
  { japanese: '古い', hiragana: 'ふるい', romaji: 'Furui', german: 'alt (Dinge)', category: 'Einkaufen' },
  { japanese: 'かわいい', hiragana: 'かわいい', romaji: 'Kawaii', german: 'Niedlich / Süß', category: 'Einkaufen' },
  { japanese: 'きれい', hiragana: 'きれい', romaji: 'Kirei', german: 'schön / sauber', category: 'Einkaufen' },
  { japanese: '重い', hiragana: 'おもい', romaji: 'Omoi', german: 'schwer', category: 'Einkaufen' },
  { japanese: '軽い', hiragana: 'かるい', romaji: 'Karui', german: 'leicht', category: 'Einkaufen' },
  { japanese: '試す', hiragana: 'ためす', romaji: 'Tamesu', german: 'ausprobieren', category: 'Einkaufen' },
  { japanese: '見せる', hiragana: 'みせる', romaji: 'Miseru', german: 'zeigen', category: 'Einkaufen' },
  { japanese: '市場', hiragana: 'いちば', romaji: 'Ichiba', german: 'Markt', category: 'Einkaufen' },

  // — Hotel: Adjektive & Verben —
  { japanese: '狭い', hiragana: 'せまい', romaji: 'Semai', german: 'eng / klein (Raum)', category: 'Hotel' },
  { japanese: '便利', hiragana: 'べんり', romaji: 'Benri', german: 'praktisch / bequem', category: 'Hotel' },
  { japanese: '不便', hiragana: 'ふべん', romaji: 'Fuben', german: 'unpraktisch', category: 'Hotel' },
  { japanese: 'うるさい', hiragana: 'うるさい', romaji: 'Urusai', german: 'laut / nervig', category: 'Hotel' },
  { japanese: '起きる', hiragana: 'おきる', romaji: 'Okiru', german: 'aufwachen / aufstehen', category: 'Hotel' },
  { japanese: '寝る', hiragana: 'ねる', romaji: 'Neru', german: 'Schlafen / Ins Bett gehen', category: 'Hotel' },
  { japanese: '開ける', hiragana: 'あける', romaji: 'Akeru', german: 'öffnen / aufmachen', category: 'Hotel' },
  { japanese: '閉める', hiragana: 'しめる', romaji: 'Shimeru', german: 'schließen / zumachen', category: 'Hotel' },
  { japanese: 'お風呂', hiragana: 'おふろ', romaji: 'Ofuro', german: 'Bad / Badewanne', category: 'Hotel' },

  // — Flughafen: Adjektive & Verben —
  { japanese: '速い', hiragana: 'はやい', romaji: 'Hayai', german: 'schnell', category: 'Flughafen' },
  { japanese: '遅い', hiragana: 'おそい', romaji: 'Osoi', german: 'langsam / spät', category: 'Flughafen' },
  { japanese: '飛ぶ', hiragana: 'とぶ', romaji: 'Tobu', german: 'fliegen', category: 'Flughafen' },

  // — Bahnhof: Verben & Transportmittel —
  { japanese: '着く', hiragana: 'つく', romaji: 'Tsuku', german: 'ankommen', category: 'Bahnhof' },
  { japanese: '出発する', hiragana: 'しゅっぱつする', romaji: 'Shuppatsu suru', german: 'abfahren / abreisen', category: 'Bahnhof' },
  { japanese: '乗り換える', hiragana: 'のりかえる', romaji: 'Norikaeru', german: 'umsteigen', category: 'Bahnhof' },
  { japanese: '車', hiragana: 'くるま', romaji: 'Kuruma', german: 'Auto / Fahrzeug', category: 'Bahnhof' },
  { japanese: 'バス', hiragana: 'バス', romaji: 'Basu', german: 'Bus', category: 'Bahnhof' },

  // — Arzt: Adjektive, Verben & Substantive —
  { japanese: 'ひどい', hiragana: 'ひどい', romaji: 'Hidoi', german: 'schlimm / schrecklich', category: 'Arzt' },
  { japanese: 'だるい', hiragana: 'だるい', romaji: 'Darui', german: 'schlapp / erschöpft', category: 'Arzt' },
  { japanese: '洗う', hiragana: 'あらう', romaji: 'Arau', german: 'waschen', category: 'Arzt' },
  { japanese: '休む', hiragana: 'やすむ', romaji: 'Yasumu', german: 'ausruhen / pausieren', category: 'Arzt' },
  { japanese: '病気', hiragana: 'びょうき', romaji: 'Byouki', german: 'Krankheit / krank sein', category: 'Arzt' },
  { japanese: '薬局', hiragana: 'やっきょく', romaji: 'Yakkyoku', german: 'Apotheke', category: 'Arzt' },
  { japanese: 'けが', hiragana: 'けが', romaji: 'Kega', german: 'Verletzung', category: 'Arzt' },
  { japanese: '体', hiragana: 'からだ', romaji: 'Karada', german: 'Körper', category: 'Arzt' },
  { japanese: '指', hiragana: 'ゆび', romaji: 'Yubi', german: 'Finger', category: 'Arzt' },

  // — Smalltalk: Adjektive & Substantive —
  { japanese: '難しい', hiragana: 'むずかしい', romaji: 'Muzukashii', german: 'schwierig', category: 'Smalltalk' },
  { japanese: '簡単', hiragana: 'かんたん', romaji: 'Kantan', german: 'einfach / leicht', category: 'Smalltalk' },
  { japanese: 'いい', hiragana: 'いい', romaji: 'Ii', german: 'gut / in Ordnung', category: 'Smalltalk' },
  { japanese: '悪い', hiragana: 'わるい', romaji: 'Warui', german: 'schlecht / böse', category: 'Smalltalk' },
  { japanese: '大切', hiragana: 'たいせつ', romaji: 'Taisetsu', german: 'wichtig / wertvoll', category: 'Smalltalk' },
  { japanese: '正しい', hiragana: 'ただしい', romaji: 'Tadashii', german: 'richtig / korrekt', category: 'Smalltalk' },
  { japanese: '変', hiragana: 'へん', romaji: 'Hen', german: 'seltsam / komisch', category: 'Smalltalk' },
  { japanese: '映画館', hiragana: 'えいがかん', romaji: 'Eigakan', german: 'Kino', category: 'Smalltalk' },

  // — Datum: Ergänzungen —
  { japanese: '去年', hiragana: 'きょねん', romaji: 'Kyonen', german: 'letztes Jahr', category: 'Datum' },
  { japanese: 'おととい', hiragana: 'おととい', romaji: 'Ototoi', german: 'vorgestern', category: 'Datum' },
  { japanese: 'あさって', hiragana: 'あさって', romaji: 'Asatte', german: 'übermorgen', category: 'Datum' },

  // — Zeitdauer: Ergänzungen —
  { japanese: 'すぐに', hiragana: 'すぐに', romaji: 'Sugu ni', german: 'sofort / gleich', category: 'Zeitdauer' },
  { japanese: 'もうすぐ', hiragana: 'もうすぐ', romaji: 'Mousugu', german: 'bald', category: 'Zeitdauer' },
  { japanese: 'たまに', hiragana: 'たまに', romaji: 'Tama ni', german: 'manchmal / gelegentlich', category: 'Zeitdauer' },

  // — Familie: Ergänzungen —
  { japanese: 'おじ', hiragana: 'おじ', romaji: 'Oji', german: 'Onkel', category: 'Familie' },
  { japanese: 'おば', hiragana: 'おば', romaji: 'Oba', german: 'Tante', category: 'Familie' },
  { japanese: 'ご主人', hiragana: 'ごしゅじん', romaji: 'Goshujin', german: 'Ehemann (angesprochen)', category: 'Familie' },
  { japanese: '奥さん', hiragana: 'おくさん', romaji: 'Okusan', german: 'Ehefrau (angesprochen)', category: 'Familie' },
  { japanese: '友達', hiragana: 'ともだち', romaji: 'Tomodachi', german: 'Freund(in)', category: 'Familie' },

  // — Gefühle: Ergänzungen —
  { japanese: '満足', hiragana: 'まんぞく', romaji: 'Manzoku', german: 'zufrieden', category: 'Gefühle' },
  { japanese: '不安', hiragana: 'ふあん', romaji: 'Fuan', german: 'beunruhigt / ängstlich', category: 'Gefühle' },
  { japanese: '緊張', hiragana: 'きんちょう', romaji: 'Kinchou', german: 'nervös / angespannt', category: 'Gefühle' },
  { japanese: '安心', hiragana: 'あんしん', romaji: 'Anshin', german: 'erleichtert / beruhigt', category: 'Gefühle' },

  // — Museum: Ergänzungen —
  { japanese: '神社', hiragana: 'じんじゃ', romaji: 'Jinja', german: 'Schrein', category: 'Museum' },
  { japanese: 'お寺', hiragana: 'おてら', romaji: 'Otera', german: 'Tempel', category: 'Museum' },
  { japanese: '入場', hiragana: 'にゅうじょう', romaji: 'Nyuujou', german: 'Einlass / Eintritt', category: 'Museum' },

  // — Wegbeschreibung: Ergänzungen —
  { japanese: '上', hiragana: 'うえ', romaji: 'Ue', german: 'oben / über', category: 'Wegbeschreibung' },
  { japanese: '下', hiragana: 'した', romaji: 'Shita', german: 'unten / unter', category: 'Wegbeschreibung' },
  { japanese: '中', hiragana: 'なか', romaji: 'Naka', german: 'Drin / Innen / Mitte', category: 'Wegbeschreibung' },
  { japanese: '外', hiragana: 'そと', romaji: 'Soto', german: 'Draußen / Außen', category: 'Wegbeschreibung' },
  { japanese: '東', hiragana: 'ひがし', romaji: 'Higashi', german: 'Osten', category: 'Wegbeschreibung' },
  { japanese: '西', hiragana: 'にし', romaji: 'Nishi', german: 'Westen', category: 'Wegbeschreibung' },
  { japanese: '南', hiragana: 'みなみ', romaji: 'Minami', german: 'Süden', category: 'Wegbeschreibung' },
  { japanese: '北', hiragana: 'きた', romaji: 'Kita', german: 'Norden', category: 'Wegbeschreibung' },
  { japanese: '教える', hiragana: 'おしえる', romaji: 'Oshieru', german: 'zeigen / erklären / lehren', category: 'Wegbeschreibung' },
  { japanese: '見つける', hiragana: 'みつける', romaji: 'Mitsukeru', german: 'finden', category: 'Wegbeschreibung' },
  { japanese: '帰る', hiragana: 'かえる', romaji: 'Kaeru', german: 'zurückkehren / nach Hause gehen', category: 'Wegbeschreibung' },
  { japanese: '街', hiragana: 'まち', romaji: 'Machi', german: 'Stadt / Stadtgebiet', category: 'Wegbeschreibung' },

  // ═══════════════════════════════════════════════════════
  // KERNVERBEN (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '行く', hiragana: 'いく', romaji: 'Iku', german: 'gehen', category: 'Wegbeschreibung' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: 'Wegbeschreibung' },
  { japanese: '見る', hiragana: 'みる', romaji: 'Miru', german: 'sehen / anschauen', category: 'Smalltalk' },
  { japanese: '聞く', hiragana: 'きく', romaji: 'Kiku', german: 'hören / fragen', category: 'Schule' },
  { japanese: '話す', hiragana: 'はなす', romaji: 'Hanasu', german: 'sprechen / reden', category: 'Kennenlernen' },
  { japanese: '書く', hiragana: 'かく', romaji: 'Kaku', german: 'schreiben', category: 'Schule' },
  { japanese: '読む', hiragana: 'よむ', romaji: 'Yomu', german: 'lesen', category: 'Schule' },
  { japanese: '使う', hiragana: 'つかう', romaji: 'Tsukau', german: 'benutzen / verwenden', category: 'Zuhause' },
  { japanese: '作る', hiragana: 'つくる', romaji: 'Tsukuru', german: 'machen / herstellen', category: 'Zuhause' },
  { japanese: '持つ', hiragana: 'もつ', romaji: 'Motsu', german: 'halten / tragen / besitzen', category: 'Einkaufen' },
  { japanese: '立つ', hiragana: 'たつ', romaji: 'Tatsu', german: 'stehen / aufstehen', category: 'Natur' },
  { japanese: '走る', hiragana: 'はしる', romaji: 'Hashiru', german: 'laufen / rennen', category: 'Natur' },
  { japanese: '泳ぐ', hiragana: 'およぐ', romaji: 'Oyogu', german: 'schwimmen', category: 'Natur' },
  { japanese: '借りる', hiragana: 'かりる', romaji: 'Kariru', german: 'leihen (von jmd.)', category: 'Schule' },
  { japanese: '貸す', hiragana: 'かす', romaji: 'Kasu', german: 'verleihen (an jmd.)', category: 'Schule' },
  { japanese: '知る', hiragana: 'しる', romaji: 'Shiru', german: 'wissen / kennen', category: 'Smalltalk' },
  { japanese: '分かる', hiragana: 'わかる', romaji: 'Wakaru', german: 'verstehen / wissen', category: 'Schule' },
  { japanese: '出かける', hiragana: 'でかける', romaji: 'Dekakeru', german: 'ausgehen / weggehen', category: 'Smalltalk' },
  { japanese: '勉強する', hiragana: 'べんきょうする', romaji: 'Benkyou suru', german: 'lernen / studieren', category: 'Schule' },
  { japanese: '働く', hiragana: 'はたらく', romaji: 'Hataraku', german: 'arbeiten', category: 'Kennenlernen' },
  { japanese: '電話する', hiragana: 'でんわする', romaji: 'Denwa suru', german: 'anrufen', category: 'Kennenlernen' },
  { japanese: 'あげる', hiragana: 'あげる', romaji: 'Ageru', german: 'geben (an jmd.)', category: 'Smalltalk' },
  { japanese: 'もらう', hiragana: 'もらう', romaji: 'Morau', german: 'bekommen / erhalten', category: 'Smalltalk' },
  { japanese: '送る', hiragana: 'おくる', romaji: 'Okuru', german: 'schicken / senden', category: 'Smalltalk' },
  { japanese: '出る', hiragana: 'でる', romaji: 'Deru', german: 'herauskommen / ausgehen', category: 'Wegbeschreibung' },
  { japanese: '入る', hiragana: 'はいる', romaji: 'Hairu', german: 'hineingehen / eintreten', category: 'Wegbeschreibung' },
  { japanese: '切る', hiragana: 'きる', romaji: 'Kiru', german: 'schneiden', category: 'Zuhause' },
  { japanese: '忘れる', hiragana: 'わすれる', romaji: 'Wasureru', german: 'vergessen', category: 'Schule' },
  { japanese: '覚える', hiragana: 'おぼえる', romaji: 'Oboeru', german: 'sich merken / einprägen', category: 'Schule' },
  { japanese: '急ぐ', hiragana: 'いそぐ', romaji: 'Isogu', german: 'sich beeilen', category: 'Bahnhof' },
  { japanese: '遊ぶ', hiragana: 'あそぶ', romaji: 'Asobu', german: 'spielen / ausgehen', category: 'Natur' },
  { japanese: '泣く', hiragana: 'なく', romaji: 'Naku', german: 'weinen', category: 'Gefühle' },
  { japanese: '笑う', hiragana: 'わらう', romaji: 'Warau', german: 'lachen', category: 'Gefühle' },
  { japanese: '手伝う', hiragana: 'てつだう', romaji: 'Tetsudau', german: 'helfen / unterstützen', category: 'Smalltalk' },
  { japanese: '始まる', hiragana: 'はじまる', romaji: 'Hajimaru', german: 'beginnen / anfangen (intrans.)', category: 'Zeitdauer' },
  { japanese: '始める', hiragana: 'はじめる', romaji: 'Hajimeru', german: 'beginnen / starten (trans.)', category: 'Zeitdauer' },
  { japanese: '終わる', hiragana: 'おわる', romaji: 'Owaru', german: 'enden / aufhören', category: 'Zeitdauer' },
  { japanese: '歌う', hiragana: 'うたう', romaji: 'Utau', german: 'singen', category: 'Smalltalk' },
  { japanese: '習う', hiragana: 'ならう', romaji: 'Narau', german: 'lernen / üben', category: 'Schule' },
  { japanese: '料理する', hiragana: 'りょうりする', romaji: 'Ryouri suru', german: 'kochen', category: 'Zuhause' },
  { japanese: '掃除する', hiragana: 'そうじする', romaji: 'Souji suru', german: 'putzen / aufräumen', category: 'Zuhause' },
  { japanese: '洗濯する', hiragana: 'せんたくする', romaji: 'Sentaku suru', german: 'Wäsche waschen', category: 'Zuhause' },
  { japanese: '運動する', hiragana: 'うんどうする', romaji: 'Undou suru', german: 'Sport treiben', category: 'Natur' },
  { japanese: '散歩する', hiragana: 'さんぽする', romaji: 'Sanpo suru', german: 'spazieren gehen', category: 'Natur' },
  { japanese: '結婚する', hiragana: 'けっこんする', romaji: 'Kekkon suru', german: 'heiraten', category: 'Familie' },
  { japanese: '卒業する', hiragana: 'そつぎょうする', romaji: 'Sotsugyou suru', german: 'abschließen / graduieren', category: 'Schule' },
  { japanese: '入学する', hiragana: 'にゅうがくする', romaji: 'Nyuugaku suru', german: 'einschreiben / aufgenommen werden', category: 'Schule' },

  // ═══════════════════════════════════════════════════════
  // KERNADJEKTIVE (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '長い', hiragana: 'ながい', romaji: 'Nagai', german: 'lang', category: 'Kleidung' },
  { japanese: '短い', hiragana: 'みじかい', romaji: 'Mijikai', german: 'kurz', category: 'Kleidung' },
  { japanese: '多い', hiragana: 'おおい', romaji: 'Ooi', german: 'viel / viele', category: 'Zahlen' },
  { japanese: '少ない', hiragana: 'すくない', romaji: 'Sukunai', german: 'wenig / wenige', category: 'Zahlen' },
  { japanese: '同じ', hiragana: 'おなじ', romaji: 'Onaji', german: 'gleich / derselbe', category: 'Smalltalk' },
  { japanese: '違う', hiragana: 'ちがう', romaji: 'Chigau', german: 'anders / falsch sein', category: 'Smalltalk' },
  { japanese: '優しい', hiragana: 'やさしい', romaji: 'Yasashii', german: 'nett / sanft / einfach', category: 'Gefühle' },
  { japanese: '明るい', hiragana: 'あかるい', romaji: 'Akarui', german: 'hell / heiter', category: 'Zuhause' },
  { japanese: '暗い', hiragana: 'くらい', romaji: 'Kurai', german: 'dunkel / finster', category: 'Zuhause' },
  { japanese: '有名', hiragana: 'ゆうめい', romaji: 'Yuumei', german: 'berühmt', category: 'Smalltalk' },
  { japanese: '危ない', hiragana: 'あぶない', romaji: 'Abunai', german: 'gefährlich', category: 'Wegbeschreibung' },
  { japanese: '汚い', hiragana: 'きたない', romaji: 'Kitanai', german: 'schmutzig / unordentlich', category: 'Zuhause' },
  { japanese: 'かっこいい', hiragana: 'かっこいい', romaji: 'Kakkoi', german: 'cool / gutaussehend', category: 'Kennenlernen' },
  { japanese: '美しい', hiragana: 'うつくしい', romaji: 'Utsukushii', german: 'schön / wunderschön', category: 'Natur' },
  { japanese: '薄い', hiragana: 'うすい', romaji: 'Usui', german: 'dünn / hell (Farbe)', category: 'Kleidung' },
  { japanese: '太い', hiragana: 'ふとい', romaji: 'Futoi', german: 'dick / fett', category: 'Kleidung' },
  { japanese: '細い', hiragana: 'ほそい', romaji: 'Hosoi', german: 'dünn / schlank', category: 'Kleidung' },
  { japanese: '大事', hiragana: 'だいじ', romaji: 'Daiji', german: 'wichtig / wertvoll', category: 'Smalltalk' },

  // ═══════════════════════════════════════════════════════
  // KERNSUBSTANTIVE & ALLTAG (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '電話', hiragana: 'でんわ', romaji: 'Denwa', german: 'Telefon', category: 'Kennenlernen' },
  { japanese: '手紙', hiragana: 'てがみ', romaji: 'Tegami', german: 'Brief', category: 'Smalltalk' },
  { japanese: '新聞', hiragana: 'しんぶん', romaji: 'Shinbun', german: 'Zeitung', category: 'Zuhause' },
  { japanese: 'テレビ', hiragana: 'テレビ', romaji: 'Terebi', german: 'Fernseher', category: 'Zuhause' },
  { japanese: '時計', hiragana: 'とけい', romaji: 'Tokei', german: 'Uhr', category: 'Uhrzeit' },
  { japanese: '自転車', hiragana: 'じてんしゃ', romaji: 'Jitensha', german: 'Fahrrad', category: 'Bahnhof' },
  { japanese: '大学', hiragana: 'だいがく', romaji: 'Daigaku', german: 'Universität', category: 'Schule' },
  { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'Ginkou', german: 'Bank', category: 'Wegbeschreibung' },
  { japanese: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'Yuubinkyoku', german: 'Post / Postamt', category: 'Wegbeschreibung' },
  { japanese: '台所', hiragana: 'だいどころ', romaji: 'Daidokoro', german: 'Küche', category: 'Zuhause' },
  { japanese: '机', hiragana: 'つくえ', romaji: 'Tsukue', german: 'Schreibtisch', category: 'Zuhause' },
  { japanese: '椅子', hiragana: 'いす', romaji: 'Isu', german: 'Stuhl', category: 'Zuhause' },
  { japanese: 'ドア', hiragana: 'ドア', romaji: 'Doa', german: 'Tür', category: 'Zuhause' },
  { japanese: '窓', hiragana: 'まど', romaji: 'Mado', german: 'Fenster', category: 'Zuhause' },
  { japanese: 'アパート', hiragana: 'アパート', romaji: 'Apaato', german: 'Wohnung / Apartment', category: 'Zuhause' },
  { japanese: '鉛筆', hiragana: 'えんぴつ', romaji: 'Enpitsu', german: 'Bleistift', category: 'Schule' },
  { japanese: 'ノート', hiragana: 'ノート', romaji: 'Nooto', german: 'Heft / Notizbuch', category: 'Schule' },
  { japanese: '辞書', hiragana: 'じしょ', romaji: 'Jisho', german: 'Wörterbuch', category: 'Schule' },
  { japanese: '財布', hiragana: 'さいふ', romaji: 'Saifu', german: 'Geldbörse / Portemonnaie', category: 'Einkaufen' },
  { japanese: '試験', hiragana: 'しけん', romaji: 'Shiken', german: 'Prüfung / Test', category: 'Schule' },
  { japanese: '宿題', hiragana: 'しゅくだい', romaji: 'Shukudai', german: 'Hausaufgaben', category: 'Schule' },
  { japanese: '教室', hiragana: 'きょうしつ', romaji: 'Kyoushitsu', german: 'Klassenzimmer', category: 'Schule' },
  { japanese: '毎日', hiragana: 'まいにち', romaji: 'Mainichi', german: 'Jeden Tag / Täglich', category: 'Datum' },
  { japanese: '毎朝', hiragana: 'まいあさ', romaji: 'Maiasa', german: 'Jeden Morgen', category: 'Datum' },
  { japanese: '毎晩', hiragana: 'まいばん', romaji: 'Maiban', german: 'Jeden Abend', category: 'Datum' },
  { japanese: '今朝', hiragana: 'けさ', romaji: 'Kesa', german: 'Heute Morgen', category: 'Datum' },
  { japanese: '今夜', hiragana: 'こんや', romaji: 'Konya', german: 'Heute Nacht / Heute Abend', category: 'Datum' },
  { japanese: '言葉', hiragana: 'ことば', romaji: 'Kotoba', german: 'Wort / Sprache', category: 'Schule' },
  { japanese: '声', hiragana: 'こえ', romaji: 'Koe', german: 'Stimme', category: 'Schule' },
  { japanese: '気持ち', hiragana: 'きもち', romaji: 'Kimochi', german: 'Gefühl / Befindlichkeit', category: 'Gefühle' },
  { japanese: '意味', hiragana: 'いみ', romaji: 'Imi', german: 'Bedeutung', category: 'Schule' },
  { japanese: '問題', hiragana: 'もんだい', romaji: 'Mondai', german: 'Problem / Aufgabe', category: 'Schule' },
  { japanese: '答え', hiragana: 'こたえ', romaji: 'Kotae', german: 'Antwort', category: 'Schule' },
  { japanese: '質問', hiragana: 'しつもん', romaji: 'Shitsumon', german: 'Frage', category: 'Schule' },

  // — Fragewörter & Demonstrativa —
  { japanese: 'これ', hiragana: 'これ', romaji: 'Kore', german: 'Das hier / Dieses (nah)', category: 'Smalltalk' },
  { japanese: 'それ', hiragana: 'それ', romaji: 'Sore', german: 'Das da / Jenes (beim Anderen)', category: 'Smalltalk' },
  { japanese: 'あれ', hiragana: 'あれ', romaji: 'Are', german: 'Das dort / Jenes (fern)', category: 'Smalltalk' },
  { japanese: 'そこ', hiragana: 'そこ', romaji: 'Soko', german: 'Dort / Da (beim Anderen)', category: 'Wegbeschreibung' },
  { japanese: 'あそこ', hiragana: 'あそこ', romaji: 'Asoko', german: 'Dort drüben (fern)', category: 'Wegbeschreibung' },
  { japanese: '誰', hiragana: 'だれ', romaji: 'Dare', german: 'Wer', category: 'Kennenlernen' },
  { japanese: 'いつ', hiragana: 'いつ', romaji: 'Itsu', german: 'wann', category: 'Datum' },
  { japanese: 'なぜ', hiragana: 'なぜ', romaji: 'Naze', german: 'warum', category: 'Smalltalk' },
  { japanese: 'どう', hiragana: 'どう', romaji: 'Dou', german: 'wie (Zustand/Meinung)', category: 'Smalltalk' },
  { japanese: 'どれ', hiragana: 'どれ', romaji: 'Dore', german: 'welches (von mehreren)', category: 'Einkaufen' },
  { japanese: '何', hiragana: 'なに / なん', romaji: 'Nani / Nan', german: 'was', category: 'Smalltalk' },

  // ═══════════════════════════════════════════════════════
  // RESTAURANT: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'おかし', hiragana: 'おかし', romaji: 'Okashi', german: 'Süßigkeiten', category: 'Restaurant' },
  { japanese: 'お酒', hiragana: 'おさけ', romaji: 'Osake', german: 'Sake / Alkohol', category: 'Restaurant' },
  { japanese: 'おにぎり', hiragana: 'おにぎり', romaji: 'Onigiri', german: 'Onigiri (Reisball)', category: 'Restaurant' },
  { japanese: 'おべんとう', hiragana: 'おべんとう', romaji: 'Obentou', german: 'Bentō', category: 'Restaurant' },
  { japanese: 'カップ', hiragana: 'カップ', romaji: 'Kappu', german: 'Tasse (cup)', category: 'Restaurant' },
  { japanese: 'きっさてん', hiragana: 'きっさてん', romaji: 'Kissaten', german: 'Teehaus / Café', category: 'Restaurant' },
  { japanese: 'ケーキ', hiragana: 'ケーキ', romaji: 'Keeki', german: 'Kuchen', category: 'Restaurant' },
  { japanese: 'こうちゃ', hiragana: 'こうちゃ', romaji: 'Koucha', german: 'schwarzer Tee', category: 'Restaurant' },
  { japanese: 'しょうゆ', hiragana: 'しょうゆ', romaji: 'Shouyu', german: 'Sojasoße', category: 'Restaurant' },
  { japanese: 'しょくどう', hiragana: 'しょくどう', romaji: 'Shokudou', german: 'Speisezimmer / Kantine', category: 'Restaurant' },
  { japanese: 'ちゃわん', hiragana: 'ちゃわん', romaji: 'Chawan', german: 'Schüssel / Reisschüssel', category: 'Restaurant' },
  { japanese: 'のみもの', hiragana: 'のみもの', romaji: 'Nomimono', german: 'Getränk', category: 'Restaurant' },
  { japanese: 'バター', hiragana: 'バター', romaji: 'Bataa', german: 'Butter', category: 'Restaurant' },
  { japanese: 'ばんごはん', hiragana: 'ばんごはん', romaji: 'Bangohan', german: 'Abendessen', category: 'Restaurant' },
  { japanese: 'ひるごはん', hiragana: 'ひるごはん', romaji: 'Hirugohan', german: 'Mittagessen', category: 'Restaurant' },
  { japanese: 'ぶたにく', hiragana: 'ぶたにく', romaji: 'Butaniku', german: 'Schweinefleisch', category: 'Restaurant' },
  { japanese: 'みず', hiragana: 'みず', romaji: 'Mizu', german: 'Wasser', category: 'Restaurant' },
  { japanese: 'りんご', hiragana: 'りんご', romaji: 'Ringo', german: 'Apfel', category: 'Restaurant' },
  { japanese: 'ナイフ', hiragana: 'ナイフ', romaji: 'Naifu', german: 'Messer', category: 'Restaurant' },
  { japanese: 'とりにく', hiragana: 'とりにく', romaji: 'Toriniku', german: 'Geflügelfleisch', category: 'Restaurant' },
  { japanese: 'ぬるい', hiragana: 'ぬるい', romaji: 'Nurui', german: 'lauwarm', category: 'Restaurant' },
  { japanese: 'ゆうはん', hiragana: 'ゆうはん', romaji: 'Yuuhan', german: 'Abendessen (umgangssprachlich)', category: 'Restaurant' },
  { japanese: 'ぎゅうにく', hiragana: 'ぎゅうにく', romaji: 'Gyuuniku', german: 'Rindfleisch', category: 'Restaurant' },
  { japanese: 'ぎゅうにゅう', hiragana: 'ぎゅうにゅう', romaji: 'Gyuunyuu', german: 'Milch', category: 'Restaurant' },

  // ═══════════════════════════════════════════════════════
  // KLEIDUNG: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ハンカチ', hiragana: 'ハンカチ', romaji: 'Hankachi', german: 'Taschentuch', category: 'Kleidung' },
  { japanese: 'ふく', hiragana: 'ふく', romaji: 'Fuku', german: 'Kleidung (allgemein)', category: 'Kleidung' },
  { japanese: 'ようふく', hiragana: 'ようふく', romaji: 'Youfuku', german: 'westliche Kleidung', category: 'Kleidung' },
  { japanese: 'うわぎ', hiragana: 'うわぎ', romaji: 'Uwagi', german: 'Jacke / Sakko', category: 'Kleidung' },

  // ═══════════════════════════════════════════════════════
  // KENNENLERNEN: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'えいご', hiragana: 'えいご', romaji: 'Eigo', german: 'Englisch', category: 'Kennenlernen' },
  { japanese: 'おとこ', hiragana: 'おとこ', romaji: 'Otoko', german: 'Mann', category: 'Kennenlernen' },
  { japanese: 'おんな', hiragana: 'おんな', romaji: 'Onna', german: 'Frau', category: 'Kennenlernen' },
  { japanese: 'がいこく', hiragana: 'がいこく', romaji: 'Gaikoku', german: 'Ausland', category: 'Kennenlernen' },
  { japanese: 'がいこくじん', hiragana: 'がいこくじん', romaji: 'Gaikokujin', german: 'Ausländer', category: 'Kennenlernen' },
  { japanese: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'Dou itashimashite', german: 'Gern geschehen / Bitte sehr', category: 'Kennenlernen' },
  { japanese: 'ひと', hiragana: 'ひと', romaji: 'Hito', german: 'Mensch / Person', category: 'Kennenlernen' },
  { japanese: 'りゅうがくせい', hiragana: 'りゅうがくせい', romaji: 'Ryuugakusei', german: 'Austauschstudent', category: 'Kennenlernen' },
  { japanese: 'いらっしゃいませ', hiragana: 'いらっしゃいませ', romaji: 'Irasshaimase', german: 'Willkommen (in Laden/Restaurant)', category: 'Kennenlernen' },

  // ═══════════════════════════════════════════════════════
  // HOTEL: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'エアコン', hiragana: 'エアコン', romaji: 'Eakon', german: 'Klimaanlage', category: 'Hotel' },
  { japanese: 'でんき', hiragana: 'でんき', romaji: 'Denki', german: 'elektrisches Licht / Strom', category: 'Hotel' },
  { japanese: 'げんかん', hiragana: 'げんかん', romaji: 'Genkan', german: 'Eingangsbereich (Hausflur)', category: 'Hotel' },
  { japanese: 'せっけん', hiragana: 'せっけん', romaji: 'Sekken', german: 'Seife', category: 'Hotel' },
  { japanese: 'せんたく', hiragana: 'せんたく', romaji: 'Sentaku', german: 'Wäsche waschen', category: 'Hotel' },
  { japanese: 'ろうか', hiragana: 'ろうか', romaji: 'Rouka', german: 'Korridor / Flur', category: 'Hotel' },

  // ═══════════════════════════════════════════════════════
  // MUSEUM: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'え', hiragana: 'え', romaji: 'E', german: 'Bild / Gemälde', category: 'Museum' },
  { japanese: 'きょうと', hiragana: 'きょうと', romaji: 'Kyouto', german: 'Kioto', category: 'Museum' },

  // ═══════════════════════════════════════════════════════
  // DATUM: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'カレンダー', hiragana: 'カレンダー', romaji: 'Karendaa', german: 'Kalender', category: 'Datum' },
  { japanese: 'たんじょうび', hiragana: 'たんじょうび', romaji: 'Tanjoubi', german: 'Geburtstag', category: 'Datum' },
  { japanese: 'まいつき', hiragana: 'まいつき', romaji: 'Maitsuki', german: 'jeden Monat', category: 'Datum' },
  { japanese: 'まいとし', hiragana: 'まいとし', romaji: 'Maitoshi', german: 'jedes Jahr', category: 'Datum' },
  { japanese: 'まいしゅう', hiragana: 'まいしゅう', romaji: 'Maishuu', german: 'jede Woche', category: 'Datum' },
  { japanese: 'おととし', hiragana: 'おととし', romaji: 'Ototoshi', german: 'vorletztes Jahr', category: 'Datum' },
  { japanese: 'ゆうべ', hiragana: 'ゆうべ', romaji: 'Yuube', german: 'gestern Abend / letzte Nacht', category: 'Datum' },

  // ═══════════════════════════════════════════════════════
  // ZEITDAUER: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ときどき', hiragana: 'ときどき', romaji: 'Tokidoki', german: 'manchmal', category: 'Zeitdauer' },

  // ═══════════════════════════════════════════════════════
  // WEGBESCHREIBUNG: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'となり', hiragana: 'となり', romaji: 'Tonari', german: 'Nachbarschaft / Nebenan', category: 'Wegbeschreibung' },
  { japanese: 'はし', hiragana: 'はし', romaji: 'Hashi', german: 'Brücke', category: 'Wegbeschreibung' },
  { japanese: 'よこ', hiragana: 'よこ', romaji: 'Yoko', german: 'Seite / daneben', category: 'Wegbeschreibung' },
  { japanese: 'のぼる', hiragana: 'のぼる', romaji: 'Noboru', german: 'hochsteigen / besteigen', category: 'Wegbeschreibung' },
  { japanese: 'とまる', hiragana: 'とまる', romaji: 'Tomaru', german: 'halten / anhalten', category: 'Wegbeschreibung' },

  // ═══════════════════════════════════════════════════════
  // SMALLTALK: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ギター', hiragana: 'ギター', romaji: 'Gitaa', german: 'Gitarre', category: 'Smalltalk' },
  { japanese: 'パーティー', hiragana: 'パーティー', romaji: 'Paatii', german: 'Party', category: 'Smalltalk' },

  // ═══════════════════════════════════════════════════════
  // ARZT: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'めがね', hiragana: 'めがね', romaji: 'Megane', german: 'Brille', category: 'Arzt' },
  { japanese: 'みがく', hiragana: 'みがく', romaji: 'Migaku', german: 'putzen / polieren (Zähne putzen)', category: 'Arzt' },

  // ═══════════════════════════════════════════════════════
  // SONSTIGES: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ある', hiragana: 'ある', romaji: 'Aru', german: 'haben / existieren / es gibt', category: 'Smalltalk' },
  { japanese: 'いう', hiragana: 'いう', romaji: 'Iu', german: 'sagen', category: 'Smalltalk' },
  { japanese: 'いえ', hiragana: 'いえ', romaji: 'Ie', german: 'Haus', category: 'Zuhause' },
  { japanese: 'いっしょ', hiragana: 'いっしょ', romaji: 'Issho', german: 'zusammen / gemeinsam', category: 'Kennenlernen' },
  { japanese: 'いつも', hiragana: 'いつも', romaji: 'Itsumo', german: 'immer', category: 'Zeitdauer' },
  { japanese: 'いろ', hiragana: 'いろ', romaji: 'Iro', german: 'Farbe', category: 'Kleidung' },
  { japanese: 'いろいろ', hiragana: 'いろいろ', romaji: 'Iroiro', german: 'verschiedene / allerlei', category: 'Einkaufen' },
  { japanese: 'うた', hiragana: 'うた', romaji: 'Uta', german: 'Lied / Song', category: 'Smalltalk' },
  { japanese: 'うまれる', hiragana: 'うまれる', romaji: 'Umareru', german: 'geboren werden', category: 'Gefühle' },
  { japanese: 'えらぶ', hiragana: 'えらぶ', romaji: 'Erabu', german: 'auswählen / wählen', category: 'Einkaufen' },
  { japanese: 'おく', hiragana: 'おく', romaji: 'Oku', german: 'hinstellen / hinlegen', category: 'Zuhause' },
  { japanese: 'おとこのこ', hiragana: 'おとこのこ', romaji: 'Otoko no ko', german: 'Junge', category: 'Familie' },
  { japanese: 'おんなのこ', hiragana: 'おんなのこ', romaji: 'Onna no ko', german: 'Mädchen', category: 'Familie' },
  { japanese: 'かいもの', hiragana: 'かいもの', romaji: 'Kaimono', german: 'Einkauf', category: 'Einkaufen' },
  { japanese: 'かえす', hiragana: 'かえす', romaji: 'Kaesu', german: 'zurückgeben', category: 'Schule' },
  { japanese: 'かける', hiragana: 'かける', romaji: 'Kakeru', german: 'aufhängen / anrufen / telefonieren', category: 'Smalltalk' },
  { japanese: 'カタカナ', hiragana: 'カタカナ', romaji: 'Katakana', german: 'Katakana', category: 'Schule' },
  { japanese: 'かてい', hiragana: 'かてい', romaji: 'Katei', german: 'Familie / Haushalt', category: 'Familie' },
  { japanese: 'かばん', hiragana: 'かばん', romaji: 'Kaban', german: 'Tasche / Koffer', category: 'Einkaufen' },
  { japanese: 'かみ', hiragana: 'かみ', romaji: 'Kami', german: 'Papier', category: 'Schule' },
  { japanese: 'かんがえる', hiragana: 'かんがえる', romaji: 'Kangaeru', german: 'nachdenken / überlegen', category: 'Schule' },
  { japanese: 'かんじ', hiragana: 'かんじ', romaji: 'Kanji', german: 'Kanji', category: 'Schule' },
  { japanese: 'きって', hiragana: 'きって', romaji: 'Kitte', german: 'Briefmarke', category: 'Smalltalk' },
  { japanese: 'こと', hiragana: 'こと', romaji: 'Koto', german: 'Ding / Sache / Angelegenheit', category: 'Smalltalk' },
  { japanese: 'こまる', hiragana: 'こまる', romaji: 'Komaru', german: 'in Schwierigkeiten sein', category: 'Gefühle' },
  { japanese: 'こんばん', hiragana: 'こんばん', romaji: 'Konban', german: 'heute Abend', category: 'Datum' },
  { japanese: 'さいご', hiragana: 'さいご', romaji: 'Saigo', german: 'letzte / zuletzt', category: 'Zeitdauer' },
  { japanese: 'さき', hiragana: 'さき', romaji: 'Saki', german: 'vorher / zuerst / Zukunft', category: 'Zeitdauer' },
  { japanese: 'さく', hiragana: 'さく', romaji: 'Saku', german: 'blühen', category: 'Natur' },
  { japanese: 'しかし', hiragana: 'しかし', romaji: 'Shikashi', german: 'aber / jedoch', category: 'Smalltalk' },
  { japanese: 'じかん', hiragana: 'じかん', romaji: 'Jikan', german: 'Zeit', category: 'Uhrzeit' },
  { japanese: 'じどうしゃ', hiragana: 'じどうしゃ', romaji: 'Jidousha', german: 'Auto (formal)', category: 'Bahnhof' },
  { japanese: 'じぶん', hiragana: 'じぶん', romaji: 'Jibun', german: 'selbst / ich', category: 'Kennenlernen' },
  { japanese: 'じょうぶ', hiragana: 'じょうぶ', romaji: 'Joubu', german: 'robust / strapazierfähig', category: 'Kleidung' },
  { japanese: 'せいと', hiragana: 'せいと', romaji: 'Seito', german: 'Schüler', category: 'Schule' },
  { japanese: 'そちら', hiragana: 'そちら', romaji: 'Sochira', german: 'dort hin / jene Seite', category: 'Wegbeschreibung' },
  { japanese: 'たいへん', hiragana: 'たいへん', romaji: 'Taihen', german: 'sehr / schwierig / schrecklich', category: 'Gefühle' },
  { japanese: 'たてもの', hiragana: 'たてもの', romaji: 'Tatemono', german: 'Gebäude', category: 'Wegbeschreibung' },
  { japanese: 'たのむ', hiragana: 'たのむ', romaji: 'Tanomu', german: 'bitten / bestellen', category: 'Restaurant' },
  { japanese: 'たべもの', hiragana: 'たべもの', romaji: 'Tabemono', german: 'Essen / Lebensmittel', category: 'Restaurant' },
  { japanese: 'ちょうど', hiragana: 'ちょうど', romaji: 'Choudo', german: 'genau / gerade', category: 'Zeitdauer' },
  { japanese: 'つぎ', hiragana: 'つぎ', romaji: 'Tsugi', german: 'nächste / der/die Nächste', category: 'Zeitdauer' },
  { japanese: 'つける', hiragana: 'つける', romaji: 'Tsukeru', german: 'einschalten / anbringen', category: 'Zuhause' },
  { japanese: 'つまらない', hiragana: 'つまらない', romaji: 'Tsumaranai', german: 'langweilig', category: 'Gefühle' },
  { japanese: 'できる', hiragana: 'できる', romaji: 'Dekiru', german: 'können / fertig sein', category: 'Schule' },
  { japanese: 'でんわばんごう', hiragana: 'でんわばんごう', romaji: 'Denwa bangou', german: 'Telefonnummer', category: 'Kennenlernen' },
  { japanese: 'どうして', hiragana: 'どうして', romaji: 'Doushite', german: 'warum / weshalb', category: 'Smalltalk' },
  { japanese: 'どうぶつ', hiragana: 'どうぶつ', romaji: 'Doubutsu', german: 'Tier', category: 'Natur' },
  { japanese: 'ところ', hiragana: 'ところ', romaji: 'Tokoro', german: 'Ort / Stelle', category: 'Wegbeschreibung' },
  { japanese: 'とる', hiragana: 'とる', romaji: 'Toru', german: 'nehmen / greifen', category: 'Einkaufen' },
  { japanese: 'ない', hiragana: 'ない', romaji: 'Nai', german: 'nicht existieren / kein', category: 'Smalltalk' },
  { japanese: 'なくす', hiragana: 'なくす', romaji: 'Nakusu', german: 'verlieren / verschwinden lassen', category: 'Smalltalk' },
  { japanese: 'なる', hiragana: 'なる', romaji: 'Naru', german: 'werden', category: 'Smalltalk' },
  { japanese: 'にぎやか', hiragana: 'にぎやか', romaji: 'Nigiyaka', german: 'lebhaft / belebt', category: 'Smalltalk' },
  { japanese: 'ニュース', hiragana: 'ニュース', romaji: 'Nyuusu', german: 'Nachrichten', category: 'Smalltalk' },
  { japanese: 'にわ', hiragana: 'にわ', romaji: 'Niwa', german: 'Garten', category: 'Zuhause' },
  { japanese: 'はがき', hiragana: 'はがき', romaji: 'Hagaki', german: 'Postkarte', category: 'Smalltalk' },
  { japanese: 'はこ', hiragana: 'はこ', romaji: 'Hako', german: 'Kasten / Schachtel', category: 'Zuhause' },
  { japanese: 'はなし', hiragana: 'はなし', romaji: 'Hanashi', german: 'Geschichte / Gespräch', category: 'Smalltalk' },
  { japanese: 'はやい', hiragana: 'はやい', romaji: 'Hayai', german: 'früh / frühzeitig', category: 'Uhrzeit' },
  { japanese: 'ひく', hiragana: 'ひく', romaji: 'Hiku', german: 'ziehen', category: 'Sonstiges' },
  { japanese: 'ひくい', hiragana: 'ひくい', romaji: 'Hikui', german: 'niedrig', category: 'Wegbeschreibung' },
  { japanese: 'ひとり', hiragana: 'ひとり', romaji: 'Hitori', german: 'eine Person / allein', category: 'Kennenlernen' },
  { japanese: 'プール', hiragana: 'プール', romaji: 'Puuru', german: 'Pool / Schwimmbad', category: 'Natur' },
  { japanese: 'ほか', hiragana: 'ほか', romaji: 'Hoka', german: 'anderes / sonst', category: 'Smalltalk' },
  { japanese: 'ぼく', hiragana: 'ぼく', romaji: 'Boku', german: 'ich (männlich, informell)', category: 'Kennenlernen' },
  { japanese: 'ほしい', hiragana: 'ほしい', romaji: 'Hoshii', german: 'wünschen / wollen', category: 'Gefühle' },
  { japanese: 'ポスト', hiragana: 'ポスト', romaji: 'Posuto', german: 'Briefkasten', category: 'Wegbeschreibung' },
  { japanese: 'ほんだな', hiragana: 'ほんだな', romaji: 'Hondana', german: 'Bücherregal', category: 'Zuhause' },
  { japanese: 'ほんとう', hiragana: 'ほんとう', romaji: 'Hontou', german: 'wirklich / wahr', category: 'Smalltalk' },
  { japanese: 'また', hiragana: 'また', romaji: 'Mata', german: 'wieder / auch', category: 'Smalltalk' },
  { japanese: 'まるい', hiragana: 'まるい', romaji: 'Marui', german: 'rund', category: 'Sonstiges' },
  { japanese: 'みなさん', hiragana: 'みなさん', romaji: 'Minasan', german: 'meine Damen und Herren / alle', category: 'Kennenlernen' },
  { japanese: 'もの', hiragana: 'もの', romaji: 'Mono', german: 'Ding / Sache', category: 'Smalltalk' },
  { japanese: 'よく', hiragana: 'よく', romaji: 'Yoku', german: 'oft / gut / gründlich', category: 'Smalltalk' },
  { japanese: 'よぶ', hiragana: 'よぶ', romaji: 'Yobu', german: 'rufen / einladen', category: 'Smalltalk' },
  { japanese: 'ラジオ', hiragana: 'ラジオ', romaji: 'Rajio', german: 'Radio', category: 'Smalltalk' },
  { japanese: 'りっぱ', hiragana: 'りっぱ', romaji: 'Rippa', german: 'herrlich / prächtig', category: 'Smalltalk' },
  { japanese: 'れいぞうこ', hiragana: 'れいぞうこ', romaji: 'Reizouko', german: 'Kühlschrank', category: 'Zuhause' },
  { japanese: 'れんしゅうする', hiragana: 'れんしゅうする', romaji: 'Renshuu suru', german: 'üben', category: 'Schule' },
  { japanese: 'わたし', hiragana: 'わたし', romaji: 'Watashi', german: 'ich', category: 'Kennenlernen' },
  { japanese: 'わたす', hiragana: 'わたす', romaji: 'Watasu', german: 'übergeben / überreichen', category: 'Smalltalk' },
  { japanese: 'する', hiragana: 'する', romaji: 'Suru', german: 'machen / tun', category: 'Smalltalk' },
  { japanese: 'いる', hiragana: 'いる', romaji: 'Iru', german: 'sein / vorhanden sein (belebte Wesen)', category: 'Smalltalk' },
  { japanese: 'ええ', hiragana: 'ええ', romaji: 'Ee', german: 'ja (informell)', category: 'Smalltalk' },
  { japanese: 'おす', hiragana: 'おす', romaji: 'Osu', german: 'drücken', category: 'Zuhause' },
  { japanese: 'こうばん', hiragana: 'こうばん', romaji: 'Kouban', german: 'Polizeiwache', category: 'Wegbeschreibung' },
  { japanese: 'そうじ', hiragana: 'そうじ', romaji: 'Souji', german: 'Saubermachen / Putzen', category: 'Zuhause' },
  { japanese: 'たぶん', hiragana: 'たぶん', romaji: 'Tabun', german: 'vielleicht / wahrscheinlich', category: 'Smalltalk' },
  { japanese: 'だんだん', hiragana: 'だんだん', romaji: 'Dandan', german: 'nach und nach / allmählich', category: 'Zeitdauer' },
  { japanese: 'なつやすみ', hiragana: 'なつやすみ', romaji: 'Natsuyasumi', german: 'Sommerferien', category: 'Natur' },

  // ═══════════════════════════════════════════════════════
  // SONSTIGES
  // ═══════════════════════════════════════════════════════
  { japanese: 'はい', hiragana: 'はい', romaji: 'Hai', german: 'ja', category: 'Smalltalk' },
  { japanese: 'いいえ', hiragana: 'いいえ', romaji: 'Iie', german: 'nein', category: 'Smalltalk' },
  { japanese: 'ちょっと', hiragana: 'ちょっと', romaji: 'Chotto', german: 'ein bisschen / kurz', category: 'Smalltalk' },
  { japanese: 'とても', hiragana: 'とても', romaji: 'Totemo', german: 'sehr', category: 'Smalltalk' },
  { japanese: 'もう少し', hiragana: 'もうすこし', romaji: 'Mou sukoshi', german: 'noch etwas / ein bisschen mehr', category: 'Smalltalk' },
  { japanese: 'たくさん', hiragana: 'たくさん', romaji: 'Takusan', german: 'viel / viele', category: 'Smalltalk' },
  { japanese: 'あまり〜ない', hiragana: 'あまりない', romaji: 'Amari ~nai', german: 'nicht sehr ~ / kaum ~', category: 'Smalltalk' },
  { japanese: '全部', hiragana: 'ぜんぶ', romaji: 'Zenbu', german: 'alles / insgesamt', category: 'Smalltalk' },
  { japanese: 'だけ', hiragana: 'だけ', romaji: 'Dake', german: 'nur / lediglich', category: 'Smalltalk' },
  { japanese: 'でも', hiragana: 'でも', romaji: 'Demo', german: 'aber / jedoch', category: 'Smalltalk' },
  { japanese: 'だから', hiragana: 'だから', romaji: 'Dakara', german: 'deshalb / daher', category: 'Smalltalk' },
  { japanese: 'そして', hiragana: 'そして', romaji: 'Soshite', german: 'und dann / außerdem', category: 'Smalltalk' },
  { japanese: 'または', hiragana: 'または', romaji: 'Mata wa', german: 'oder', category: 'Smalltalk' },
  { japanese: '犬', hiragana: 'いぬ', romaji: 'Inu', german: 'Hund', category: 'Natur' },
  { japanese: '猫', hiragana: 'ねこ', romaji: 'Neko', german: 'Katze', category: 'Natur' },
  { japanese: '鳥', hiragana: 'とり', romaji: 'Tori', german: 'Vogel', category: 'Natur' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: 'Natur' },
  { japanese: '山', hiragana: 'やま', romaji: 'Yama', german: 'Berg', category: 'Natur' },
  { japanese: '川', hiragana: 'かわ', romaji: 'Kawa', german: 'Fluss', category: 'Natur' },
  { japanese: '海', hiragana: 'うみ', romaji: 'Umi', german: 'Meer', category: 'Natur' },
  { japanese: '花', hiragana: 'はな', romaji: 'Hana', german: 'Blume', category: 'Natur' },
  { japanese: '木', hiragana: 'き', romaji: 'Ki', german: 'Baum', category: 'Natur' },
  { japanese: '学校', hiragana: 'がっこう', romaji: 'Gakkou', german: 'Schule', category: 'Schule' },
  { japanese: '図書館', hiragana: 'としょかん', romaji: 'Toshokan', german: 'Bibliothek', category: 'Schule' },
  { japanese: '公園', hiragana: 'こうえん', romaji: 'Kouen', german: 'Park', category: 'Natur' },
  { japanese: '会社', hiragana: 'かいしゃ', romaji: 'Kaisha', german: 'Firma / Unternehmen', category: 'Kennenlernen' },
  { japanese: '本', hiragana: 'ほん', romaji: 'Hon', german: 'Buch', category: 'Schule' },
  { japanese: 'ペン', hiragana: 'ペン', romaji: 'Pen', german: 'Stift', category: 'Schule' },
  { japanese: 'スマホ', hiragana: 'スマホ', romaji: 'Sumaho', german: 'Smartphone', category: 'Zuhause' },
  { japanese: 'パソコン', hiragana: 'パソコン', romaji: 'Pasokon', german: 'Computer', category: 'Zuhause' },
  { japanese: 'わかりました。ありがとうございます。', hiragana: 'わかりました。ありがとうございます。', romaji: 'Wakarimashita. Arigatou gozaimasu.', german: 'Verstanden. Vielen Dank.', category: 'Smalltalk' },
  { japanese: 'もう一度言ってください。', hiragana: 'もういちどいってください。', romaji: 'Mou ichido itte kudasai.', german: 'Sagen Sie das bitte noch einmal.', category: 'Smalltalk' },
  { japanese: 'ゆっくり話してください。', hiragana: 'ゆっくりはなしてください。', romaji: 'Yukkuri hanashite kudasai.', german: 'Bitte sprechen Sie langsamer.', category: 'Smalltalk' },
];

export async function seed(): Promise<void> {
  await initDb();

  // V2 migration: old category structure detected → truncate and re-seed
  // Only checks categories that NO LONGER EXIST in the new structure
  const hasLegacy = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category IN ('Begrüßung','Essen','Getränke','Körper','Orte','Verkehr','Tiere','Farben','Adjektive','Verben','Grundwörter','Wohnung','Gesundheit','Kanji','Monate','Zeit')"
  );
  if (Number(hasLegacy.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V2: Alte Kategorien erkannt — lade neue Kategorienstruktur...');
  }

  // V3 migration: reorganized Sonstiges into proper categories (Schule, Zuhause, Natur, …)
  const hasV2Sonstiges = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category = 'Sonstiges' AND japanese = '学校'"
  );
  if (Number(hasV2Sonstiges.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V3: Kategorien neu geordnet — lade aktualisierte Struktur...');
  }

  // V4 migration: KERNVERBEN/KERNADJEKTIVE properly categorized (行く→Wegbeschreibung, etc.)
  const hasV3Sonstiges = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category = 'Sonstiges' AND japanese = '行く'"
  );
  if (Number(hasV3Sonstiges.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V4: Kernverben und Kernadjektive neu kategorisiert...');
  }

  // V5 migration: German translations corrected (only nouns capitalized)
  const hasOldGerman = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE japanese = '行く' AND german = 'Gehen'"
  );
  if (Number(hasOldGerman.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V5: Deutsche Übersetzungen korrigiert (nur Substantive groß)...');
  }

  // Incremental insert — skip if (japanese, category) already exists
  let added = 0;
  for (const entry of vocabulary) {
    const exists = await db.execute({
      sql: 'SELECT id FROM vocabulary WHERE japanese = ? AND category = ?',
      args: [entry.japanese, entry.category],
    });
    if (exists.rows.length === 0) {
      const result = await db.execute({
        sql: `INSERT INTO vocabulary (japanese, hiragana, romaji, german, category) VALUES (?, ?, ?, ?, ?)`,
        args: [entry.japanese, entry.hiragana, entry.romaji, entry.german, entry.category],
      });
      await db.execute({
        sql: `INSERT OR IGNORE INTO progress (vocabulary_id, score, review_count, next_review) VALUES (?, 0, 0, datetime('now'))`,
        args: [result.lastInsertRowid ?? 0],
      });
      added++;
    }
  }

  const total = (await db.execute('SELECT COUNT(*) as c FROM vocabulary')).rows[0]?.c;
  console.log(`🌸 ${added} neue Einträge hinzugefügt. Gesamt: ${total}.`);
}
