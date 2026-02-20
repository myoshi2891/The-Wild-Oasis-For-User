export const translations = {
  en: {
    nav: {
      cabins: "Cabins",
      about: "About",
      guestArea: "Guest area",
    },
    home: {
      title: "Welcome to paradise.",
      cta: "Explore luxury cabins",
    },
    about: {
      title1: "Welcome to The Wild Oasis",
      p1_1: "Where nature's beauty and comfortable living blend seamlessly. Hidden away in the heart of the Italian Dolomites, this is your paradise away from home. But it's not just about the luxury cabins. It's about the experience of reconnecting with nature and enjoying simple pleasures with family.",
      p1_2: "Our {count} luxury cabins provide a cozy base, but the real freedom and peace you'll find in the surrounding mountains. Wander through lush forests, breathe in the fresh air, and watch the stars twinkle above from the warmth of a campfire or your hot tub.",
      p1_3: "This is where memorable moments are made, surrounded by nature's splendor. It's a place to slow down, relax, and feel the joy of being together in a beautiful setting.",
      title2: "Managed by our family since 1962",
      p2_1: "Since 1962, The Wild Oasis has been a cherished family-run retreat. Started by our grandparents, this haven has been nurtured with love and care, passing down through our family as a testament to our dedication to creating a warm, welcoming environment.",
      p2_2: "Over the years, we've maintained the essence of The Wild Oasis, blending the timeless beauty of the mountains with the personal touch only a family business can offer. Here, you're not just a guest; you're part of our extended family. So join us at The Wild Oasis soon, where tradition meets tranquility, and every visit is like coming home.",
      cta: "Explore our luxury cabins"
    },
    cabins: {
      title: "Our Luxury Cabins",
      description: "Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful mountain views, spending your days exploring the dark forests around, or just relaxing in your private hot tub under the stars. Enjoy nature's beauty in your own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to paradise."
    },
    common: {
      toggleLang: "JA",
    }
  },
  ja: {
    nav: {
      cabins: "キャビン",
      about: "当施設について",
      guestArea: "ゲストエリア",
    },
    home: {
      title: "大自然という名の、楽園へ。",
      cta: "ラグジュアリーなキャビンを探す",
    },
    about: {
      title1: "The Wild Oasisへようこそ",
      p1_1: "自然の美しさと快適な暮らしがシームレスに融合する場所。イタリアのドロミテの中心に隠れた、あなたの第二の楽園です。ラグジュアリーなキャビンだけではありません。自然とのつながりを取り戻し、家族との日々の喜びを味わう体験がここにあります。",
      p1_2: "全{count}棟のラグジュアリーなキャビンは快適な滞在の拠点ですが、本当の自由と安らぎは周囲の山々にあります。緑豊かな森を散策し、新鮮な空気を胸いっぱいに吸い込み、キャンプファイヤーや露天風呂の温もりから、頭上に瞬く星々を眺めてみませんか。",
      p1_3: "雄大な自然に囲まれ、想い出に残るひとときが生まれる場所。ここでは歩みを緩め、リラックスし、美しい環境の中で共に過ごす喜びを感じることができます。",
      title2: "1962年から続く、私たちの家族の物語",
      p2_1: "1962年以来、The Wild Oasisは家族経営の大切な隠れ家であり続けています。祖父母が始めたこの安らぎの場所は、温かく居心地の良い環境を作りたいという私たちの想いの証として、愛情を込めて育まれ、家族へと受け継がれてきました。",
      p2_2: "長年にわたり、私たちは山の不変的な美しさと、家族経営ならではのパーソナルな対応を融合させ、The Wild Oasisの本質を守り続けてきました。ここでは、あなたは単なる「ゲスト」ではなく「家族」の一員です。伝統と静寂が出会い、何度訪れても我が家に帰ってきたかのようなThe Wild Oasisへ、ぜひお越しください。",
      cta: "ラグジュアリーなキャビンを探す"
    },
    cabins: {
      title: "ラグジュアリー・キャビン",
      description: "イタリアのドロミテの中心に佇む、居心地の良いラグジュアリーなキャビン。美しい山々を眺めながら目覚め、暗い森を探索し、星空の下でプライベートな露天風呂でリラックスする日々を想像してみてください。大自然の美しさを、あなただけの「第二の我が家」でお楽しみください。穏やかで平和な休暇を過ごすのに最適な場所。楽園へ、ようこそ。"
    },
    common: {
      toggleLang: "EN",
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
