const ButtonSearch = document.querySelector('#ButtonSearch');
const input = document.querySelector('input');
const Name1 = document.querySelector('#Name1');
const Name2 = document.querySelector('#Name2');
const Profile1 = document.querySelector('#Profile1');
const Profile2 = document.querySelector('#Profile2')
const Description = document.querySelector('p');
const LinkGithub = document.querySelector('#LinkGithub');
const ul = document.querySelector('ul');

const fetchApiUser = (value) => {
    const result = fetch(`https://api.github.com/users/${value}`)
    .then((res)=> res.json())
    .then((data)=>{
        return data;
    });
    return result;
}
const fetchApiRepos = (value) => {
    const resultRepos = fetch(`https://api.github.com/users/${value}/repos`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        return data;
    });
    return resultRepos;
}

ButtonSearch.onclick = async (event) => {
    event.preventDefault();

    if (input.value ===''){
        alert('Digite um nome de usuario!')
    } else {
        const result = await fetchApiUser(input.value);
        if(result.message === "Not Found"){
            alert('Usuário não encontrado!')
        }else{
            Name1.textContent = `${JSON.stringify(result.login).replace(/"/g,'')}`;
            Name2.textContent = `${JSON.stringify(result.name).replace(/"/g,'')}`;
            Profile1.src = `${result.avatar_url}`;
            Profile2.src = `${result.avatar_url}`;
            Description.textContent = `${JSON.stringify(result.bio).replace(/"/g,'')}`;
            LinkGithub.href= `${result.html_url}`;
        
            ul.innerHTML="";
            const resultRepos = await fetchApiRepos(input.value);
            resultRepos.forEach((repo) => {
                ul.innerHTML += `<li class=" Repositories"><a href="${repo.html_url}" target="_blank">${JSON.stringify(repo.name).replace(/"/g,'')}</a></li>`
            });
        }
        input.value = "";
    }
}