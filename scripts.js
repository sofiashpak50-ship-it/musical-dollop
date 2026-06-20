document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

let tokenClient;


    window.onload = function () {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: 'ТВІЙ_CLIENT_ID_ТУТ.apps.googleusercontent.com', //ЗАМІНИ ЦЕ НА СВІЙ CLIENT ID
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    console.log("Успішний вхід! Токен доступу:", tokenResponse.access_token);
                    fetchUserProfile(tokenResponse.access_token);
                }
            },
        });


        document.getElementById('google-login-btn').addEventListener('click', function(event) {
            event.preventDefault();
            tokenClient.requestAccessToken();
        });
    };


    function fetchUserProfile(accessToken) {
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(profile => {
            console.log("Дані твого користувача:", profile);
            alert(`Привіт, ${profile.name}! Ти успішно увійшла через Google.`);
            document.getElementById('google-login-btn').innerHTML = `<img src="${profile.picture}" style="width:30px; height:30px; border-radius:50%;">`;
        })
        .catch(error => console.error('Помилка отримання профілю:', error));
    }