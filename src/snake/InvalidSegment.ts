class InvalidSegment extends Error {
  constructor(message: string) {
    super(`InvalidSegment: ${message}`);
  }
}

export default InvalidSegment;
