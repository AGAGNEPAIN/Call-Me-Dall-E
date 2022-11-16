import style from "./style.module.css";

export function SubmitButton(props: { submitButtonChecked: boolean }) {
  const { submitButtonChecked } = props;

  return (
    <div
      id={`${style.button__wrapper}`}
      className={submitButtonChecked ? style.checked : ""}
    >
      <button type="submit" className={style.submit} onClick={() => {}}>
        Generate
      </button>
      <div className={style.loader__wrapper}>
        <span className={`${style.loader} ${style.yellow}`} />
        <span className={`${style.loader} ${style.pink}`} />
      </div>
      <span className={`${style.loader} ${style.orange}`} />

      <div className={style.check__wrapper}>
        <svg version="1.1" width="65px" height="38px" viewBox="0 0 64.5 37.4">
          <polyline className={style.check} points="5,13 21.8,32.4 59.5,5 " />
        </svg>
      </div>
    </div>
  );
}
