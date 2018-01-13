enum TokenType {
    Note, // 1 2 3 4 5 6 7 0 %
    Suffix,
    Tie,
    Chord,
    Tuplet,
    Appoggiatura,
    MeasureBound,
    Comment,
    RepeatBound,
    RepeatSkip,
    Terminal,
    Function,
    FunctionSimplified,
    Unrecognized, // Oops!
}

enum StructureType {
    Header,
    Section,
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

export {TokenType, StructureType, SuffixType, PairType}
