import { useState, useEffect } from 'react';


const ContactPage = () => {

    // Guarda o end point da API
    const url = 'http://localhost:5000/message';
   
    // Recebe retorno da API
    const [message, setMessage] = useState([]);

    // Variaveis para armazenar o autor e mensagem
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    // Valida se os campos estão preenchidos no form
    const [validator, setValidator] = useState(false);

    // Controla render de mensagens na tela
    const [render, setRender] = useState(false);

    // Controla mensagem de sucesso na tela
    const [success, setSuccess] = useState(false);

    // Faz leitura do endpoint da API se render for verdadeiro
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setMessage(data);
    }, [render]);

    //console.log(message);

    
    // Envia a mensagem para o back-end
    const sendMessage = () => {
        
        // Valida se os campos foram preenchidos
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            //return alert('Por favor preecha todos os campos!!');
            return setValidator(!validator);
        }

        // Formata Json para envio dos dados do formulário apra API
        const bodyForm = {
            email: author,
            message: content,
        }
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        // Aguarda a resposta do envio
        .then((response) => response.json())
        .then((data)=>{
            // Retorna a mensagem enviada em formato json
            //console.log(data);
            if(data.id) {
                // valida se o Json retornado criou um ID dentro da API
                setRender(true);
                // Manda mensagem de sucesso na tela
                setSuccess(true);
                // Tira a mensagem da tela após 4 segundos
                setTimeout(()=>{
                    setSuccess(false);
                }, 4000);
            }
        })

        setAuthor('');
        setContent('');
    }


    return(
        <>
        <div className="wrap-form">
            <label>E-mail</label>
            <input type="text" name="input_email" value={author} onChange={(event)=>{setAuthor(event.target.value)}}></input>
            <label>Mensagem</label>
            <textarea name="input_message" value={content} onChange={(event)=>{setContent(event.target.value)}}></textarea>

            {/* Verifia o erro */}
            {validator && 
                <div className="validade">
                    <strong>Por favor preencha todos os campos!</strong>
                </div>
            }

            {/* Quando mensagem enviada com sucesso */}
            {success && 
                <div className="validade">
                    <strong>Mensagem enviada com sucesso!</strong>
                </div>
            }

            <input type="submit" value="Enviar" onClick={sendMessage}></input>
        </div>
        <div className="wrap-mensages">
            <div className="container">
                {message.map((content)=>{
                    return(
                        <div className="card" key={content.id}>
                            <div className="card-body">
                                <h5>{content.email}</h5>
                                <p className="card-mensage">
                                    {content.message}
                                </p>
                                <span>{content.created_at}</span>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
        </>
    )
}
export default ContactPage;