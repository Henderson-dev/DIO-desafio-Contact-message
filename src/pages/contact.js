import { useState, useEffect } from 'react';


const ContactPage = () => {

   
    // Recebe retorno da API
    const [message, setMessage] = useState([]);

    // Variaveis para armazenar o autor e mensagem
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    // Faz leitura do endpoint da API
    useEffect(async () => {
        const response = await fetch('http://localhost:5000/message');
        const data = await response.json();
        //console.log(data);
        setMessage(data);
    }, []);

    //console.log(message);

    return(
        <>

        <div className="wrap-form">
            <label>E-mail</label>
            <input type="text" name="input_email"></input>
            <label>Mensagem</label>
            <textarea name="input_message"></textarea>
            <input type="submit" value="Enviar"></input>
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