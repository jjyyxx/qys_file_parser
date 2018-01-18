declare enum TokenType {
    Note = 0,
    Suffix = 1,
    Tie = 2,
    Fermata = 3,
    Portamento = 4,
    Tremolo1 = 5,
    Tremolo2 = 6,
    Tuplet = 7,
    Appoggiatura = 8,
    MeasureBound = 9,
    Comment = 10,
    RepeatSkip = 11,
    Function = 12,
    FunctionSimplified = 13,
    Pitch = 14,
    Unrecognized = 15,
}
declare enum StructureType {
    Header = 0,
    Section = 1,
}
declare enum SuffixType {
    Flat = 0,
    Sharp = 1,
    DotAbove = 2,
    DotBelow = 3,
    DotAfter = 4,
    Underline = 5,
    Dash = 6,
    Staccato = 7,
}
declare enum BoundType {
    Normal = 0,
    Terminal = 1,
    RepeatLeft = 2,
    RepeatRight = 3,
    RepeatBoth = 4,
}
export { TokenType, StructureType, SuffixType, BoundType };
