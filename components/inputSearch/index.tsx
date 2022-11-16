import { Dispatch, SetStateAction } from "react";

import style from "./style.module.css";

export function InputSearch(props: {
  formData: { prompt: string; number: number };
  setFormData: Dispatch<SetStateAction<{ prompt: string; number: number }>>;
}) {
  const { formData, setFormData } = props;

  return (
    <div className={`${style.form__group} ${style.field}`}>
      <input
        type="input"
        className={style.form__field}
        placeholder="Image description"
        name="description"
        id="description"
        required
        value={formData.prompt}
        onChange={(e) => {
          setFormData({ ...formData, prompt: e.target.value });
        }}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="description" className={style.form__label}>
        Image description
      </label>
    </div>
  );
}
