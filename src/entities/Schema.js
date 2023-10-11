export default class FileSchema {
  constructor(
    _id = "0000",
    title = "no_title",
    version = 0,
    data = [
      {
        _id: "00",
        name: "root_no_schema",
        type: "root",
        parent_id: null,
        schema_id: null,
        is_attribute: false,
        value: null,
        lavelH: 0,
        __v: 0,
        childrens: [],
      },
    ]
  ) {
    this._id = _id;
    this.title = title;
    this.version = version;
    this.data = data;
  }
}
