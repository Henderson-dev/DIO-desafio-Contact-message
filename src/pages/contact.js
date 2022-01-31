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

    // Faz leitura do endpoint da API
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setMessage(data);
    }, []);

    //console.log(message);

    
    // Envia a mensagem para o back-end
    const sendMessage = () => {
        
        // Valida se os campos foram preenchidos
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            //return alert('Por favor preecha todos os campos!!');
            return setValidator(!validator);
        }

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