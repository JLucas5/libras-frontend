//autentica o usuário
export const isAuthenticated = () => {

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  
  if(token && email==="admin@gmail.com.br") {
    return true;
  } else {
    if(token){
      alert("Insira uma conta com privilégios de administrador");
    }
    return false;
  }
};
  