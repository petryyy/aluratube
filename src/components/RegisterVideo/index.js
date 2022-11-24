import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    }
  };
}

const PROJECT_URL = "https://odnddpsqdbsbvuzirkqk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbmRkcHNxZGJzYnZ1emlya3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMzg3NDksImV4cCI6MTk4NDgxNDc0OX0.RNrJgucJVvMbCRkKH-jgu2sBjmhFcFfR9kpehWdx5tM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")(1)}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({ 
    initialValues : { title: "", url: "" }
  });
  const [formVisible, setFormVisible] = React.useState(false);
  
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisible(true)}>
        +
      </button>
      {formVisible
        ? (
          <form onSubmit={(event) => {
            event.preventDefault();

            supabase.from("video").insert({
              title: formCadastro.values.title,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            })
            .then((oqueveio) => {
              console.log(oqueveio);
            })
            .catch((erro) => {
              console.log(erro);
            });

            setFormVisible(false);
            formCadastro.clearForm();
          }}>
            <div>
              <button type="button" className="close-modal" onClick={() => setFormVisible(false)}>
                X
              </button>

              <input
                placeholder="Título do vídeo"
                name="title"
                value={formCadastro.values.title}
                onChange={formCadastro.handleChange}
              />

              <input 
                placeholder="URL"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />

              <button type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        )
        : false};

    </StyledRegisterVideo>
  )
}