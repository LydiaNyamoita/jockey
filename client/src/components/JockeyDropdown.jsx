import Select from "react-select";
// eslint-disable-next-line react/prop-types
export default function JockeyDropdown({ jockeys, setSelected, error }) {
  let options = [];
  for (let i = 0; i < jockeys.length; i++) {
    const element = jockeys[i];
    var dict = {};
    dict["value"] = element;
    dict["label"] = element.jockeyName;
    options.push(dict);
  }

  //   console.log(options);
  return (
    <>
      <Select
        placeholder={<div>Select a Jockey</div>}
        options={options}
        onChange={(opt) => setSelected(opt)}
        {...error}
      ></Select>
    </>
  );
}
