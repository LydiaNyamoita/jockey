import Select from "react-select";
import PropTypes from "prop-types";
import { Jockey } from "../models/jockey";
import React from "react";
import { string } from "yup";

export default function JockeyDropdown(
  { jockeys, setSelected, error } = { jockeys: [], error: string || undefined }
) {
  let options: {}[] = [];
  for (let i = 0; i < jockeys.length; i++) {
    const element: Jockey = jockeys[i];
    var dict: {} = {};
    dict["value"] = element;
    dict["label"] = element.name;
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
// JockeyDropdown.propTypes = {
//   name: PropTypes.jockeys.array,
// };
