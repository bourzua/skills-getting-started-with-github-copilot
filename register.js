document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const list = document.getElementById('registeredList');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email')
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // 새 항목을 목록에 추가
                const li = document.createElement('li');
                li.textContent = `${data.name} (${data.email})`;
                list.appendChild(li);
                
                // 폼 초기화
                form.reset();
            }
        } catch (error) {
            console.error('등록 실패:', error);
            alert('등록 중 오류가 발생했습니다.');
        }
    });
});
