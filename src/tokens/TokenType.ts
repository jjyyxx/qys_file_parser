enum TokenType {
    Staff, // 1 2 3 4 5 6 7 0 %
    Suffix,
    Tie,
    Chord,
    Tuplet,
    Appoggiatura,
    Setting,
    Measure,
    Comment,
    Repeat,
    RepeatSkip,
    Terminal,
    Unrecognized, // Oops!
}

enum SuffixType {
    Flat,       // b
    Sharp,      // #
    DotAbove,   // '
    DotBelow,   // ,
    DotAfter,   // .
    Underline,  // _
    Dash,       // -
}

enum PairType {
    Left,
    Right,
}

export {TokenType, SuffixType, PairType}
