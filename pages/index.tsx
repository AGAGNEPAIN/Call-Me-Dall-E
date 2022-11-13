import Head from "next/head";
import Image from "next/image";
import { ImagesResponseDataInner } from "openai";
import { useCallback, useState } from "react";
import TypeIt from "typeit-react";

import style from "../styles/Home.module.css";

export default function Home() {
  const [formData, setFormData] = useState({ prompt: "", number: 1 });

  const [imagesData, setImagesData] = useState<Array<ImagesResponseDataInner>>(
    []
  );
  const [error, setError] = useState<boolean>(false);
  const [submitClass, setSubmitClass] = useState("");

  const getImages = useCallback(async () => {
    setError(false);
    setSubmitClass(style.checked);
    setTimeout(() => {
      setSubmitClass("");
    }, 6500);

    const response = await fetch("/api/generate-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      response.json().then((data) => setImagesData(data));
    } else {
      setError(true);
    }
  }, [setImagesData, formData, style]);

  return (
    <>
      <Head>
        <title>Image Generator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={style.header}>
        <TypeIt
          element="h1"
          getBeforeInit={(instance) => {
            instance
              .type(
                `Modern <span class=${style.bold}>AI</span> Image generator`
              )
              .pause(750)
              .move(-19, { delay: 50 })
              .delete()
              .pause(150)
              .type(`<span class=${style.bold}>Perfect</span>`);

            return instance;
          }}
        />
      </header>
      <p className={style.explantions}>Describ the image you want 🚀</p>
      <form
        className={style["image-details"]}
        onSubmit={(e) => {
          e.preventDefault();
          getImages();
        }}
      >
        {/* Input prompt */}
        <div className={`${style.form__group} ${style.field}`}>
          <input
            type="input"
            className={style.form__field}
            placeholder="High quality photo of a monkey astronaut"
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

        {/* Button submit */}
        <div id={`${style.button__wrapper}`} className={submitClass}>
          <button type="submit" className={style.submit} onClick={() => {}}>
            Generate
          </button>
          <div className={style.loader__wrapper}>
            <span className={`${style.loader} ${style.yellow}`} />
            <span className={`${style.loader} ${style.pink}`} />
          </div>
          <span className={`${style.loader} ${style.orange}`} />

          <div className={style.check__wrapper}>
            <svg
              version="1.1"
              width="65px"
              height="38px"
              viewBox="0 0 64.5 37.4"
            >
              <polyline
                className={style.check}
                points="5,13 21.8,32.4 59.5,5 "
              />
            </svg>
          </div>
        </div>
      </form>

      {error && <h6 className="error">Une erreur est survenue</h6>}

      <div className={style.images__container}>
        {imagesData.length > 0 &&
          imagesData.map((image, index) => {
            return (
              <div className={style.image__wrapper}>
                <Image
                  key={index}
                  src={image?.url ?? "https://www.fillmurray.com/512/512"}
                  alt="OpenAi Dall-e generated image"
                  fill
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
