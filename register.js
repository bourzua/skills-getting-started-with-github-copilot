document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            // 새 등록자를 명단에 추가
            addToList(data);
            // 폼 초기화
            this.reset();
        }
    } catch (error) {
        console.error('등록 중 오류 발생:', error);
    }
});

function addToList(data) {
    const list = document.getElementById('registeredList');
    const newItem = document.createElement('li');
    newItem.textContent = `${data.name} - ${data.email}`;
    list.appendChild(newItem);
}
