import Head from "next/head";
import Image from "next/image";
import { ImagesResponseDataInner } from "openai";
import { useCallback, useState } from "react";
import TypeIt from "typeit-react";

import { InputSearch } from "../components/inputSearch";
import { SubmitButton } from "../components/submitButton";
import style from "../styles/Home.module.css";

export default function Home() {
  const [formData, setFormData] = useState({ prompt: "", number: 1 });

  const [imagesData, setImagesData] = useState<Array<ImagesResponseDataInner>>(
    []
  );
  const [error, setError] = useState<boolean>(false);
  const [submitButtonChecked, setSubmitButtonChecked] = useState(false);

  const getImages = useCallback(async () => {
    setError(false);
    setSubmitButtonChecked(true);
    setTimeout(() => {
      setSubmitButtonChecked(false);
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
      setImagesData([]);
      setError(true);
    }
  }, [setImagesData, setSubmitButtonChecked, formData, style]);

  return (
    <>
      <Head>
        <title>Image Generator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={style.header}>
        <TypeIt
          element="h1"
          getBeforeInit={(instance: any) => {
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
        <InputSearch setFormData={setFormData} formData={formData} />

        {/* Button submit */}
        <SubmitButton submitButtonChecked={submitButtonChecked} />
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
