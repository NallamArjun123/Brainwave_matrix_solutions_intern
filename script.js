document.addEventListener('DOMContentLoaded', function () {
  const planner = document.getElementById('planner');
  const startHour = 9;
  const endHour = 17;
  const currentHour = new Date().getHours();

  function formatHour(hour) {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const display = hour % 12 === 0 ? 12 : hour % 12;
    return `${display} ${suffix}`;
  }

  for (let hour = startHour; hour <= endHour; hour++) {
    const row = document.createElement('div');
    row.classList.add('time-block');

    const hourLabel = document.createElement('div');
    hourLabel.classList.add('hour');
    hourLabel.textContent = formatHour(hour);

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task');

    if (hour < currentHour) input.classList.add('past');
    else if (hour === currentHour) input.classList.add('present');
    else input.classList.add('future');

    input.value = localStorage.getItem(`task-${hour}`) || '';

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('saveBtn');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => {
      localStorage.setItem(`task-${hour}`, input.value);
    };

    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clearBtn');
    clearBtn.textContent = 'Clear';
    clearBtn.onclick = () => {
      input.value = '';
      localStorage.removeItem(`task-${hour}`);
    };

    row.appendChild(hourLabel);
    row.appendChild(input);
    row.appendChild(saveBtn);
    row.appendChild(clearBtn);
    planner.appendChild(row);
  }
});
