enum TokenType {
    Note, // 1 2 3 4 5 6 7 0 %
    Suffix,
    Tie,
    Fermata,
    Portamento,
    Tremolo1,
    Tremolo2,
    Tuplet,
    Appoggiatura,
    MeasureBound,
    Comment,
    RepeatSkip,
    Function,
    FunctionSimplified,
    Pitch,
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
    Staccato,   // `
}

enum BoundType {
    Normal,
    Terminal,
    RepeatLeft,
    RepeatRight,
    RepeatBoth,
}

export {TokenType, StructureType, SuffixType, BoundType}
