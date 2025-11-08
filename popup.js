// popup.js
console.log('🎨 Popup iniciando...');

// Variáveis globais
let selectedFile = null;
let currentAudioBlob = null;

// Pega elementos do DOM
const fileInput = document.getElementById('fileInput');
const uploadLabel = document.getElementById('uploadLabel');
const fileSelected = document.getElementById('fileSelected');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeBtn = document.getElementById('removeBtn');
const submitBtn = document.getElementById('submitBtn');
const playBtn = document.getElementById('playBtn');
const status = document.getElementById('status');
const currentSound = document.getElementById('currentSound');
const copyPixBtn = document.getElementById('copyPixBtn');
const pixKey = document.getElementById('pixKey');

console.log('✅ Elementos encontrados');

// Carrega som atual do storage
try {
  chrome.storage.local.get(['customSound', 'customSoundName'], (result) => {
    console.log('📦 Storage result:', result);
    if (result.customSoundName) {
      currentSound.textContent = result.customSoundName;
      console.log('✅ Som customizado encontrado:', result.customSoundName);
    }
    if (result.customSound) {
      currentAudioBlob = result.customSound;
    }
  });
} catch (error) {
  console.error('❌ Erro ao carregar storage:', error);
}

// Evento de upload
fileInput.addEventListener('change', function(e) {
  console.log('📁 Input change detectado');
  const file = e.target.files[0];
  console.log('Arquivo selecionado:', file);
  
  if (!file) {
    console.log('❌ Nenhum arquivo');
    return;
  }
  
  console.log('Tipo:', file.type, 'Tamanho:', file.size);
  
  // Valida tipo
  if (!file.type.includes('audio/mpeg') && !file.name.endsWith('.mp3')) {
    showStatus('error', '❌ Por favor, selecione um arquivo MP3');
    return;
  }
  
  // Valida tamanho (500KB)
  if (file.size > 500 * 1024) {
    showStatus('error', '❌ Arquivo muito grande! Máximo 500KB');
    return;
  }
  
  // Guarda arquivo
  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
  
  // Mostra preview
  fileSelected.classList.add('show');
  submitBtn.disabled = false;
  
  showStatus('success', '✅ Arquivo selecionado com sucesso!');
  console.log('✅ Arquivo aceito:', file.name);
});

// Clique no label também
uploadLabel.addEventListener('click', function(e) {
  console.log('🖱️ Label clicado');
  fileInput.click();
});

// Remove arquivo selecionado
removeBtn.addEventListener('click', function() {
  console.log('🗑️ Removendo arquivo');
  selectedFile = null;
  fileInput.value = '';
  fileSelected.classList.remove('show');
  submitBtn.disabled = true;
  status.classList.remove('show');
});

// Testa o som atual
playBtn.addEventListener('click', async function() {
  console.log('🔊 Testando som...');
  playBtn.disabled = true;
  
  try {
    let audioData;
    
    // Se tem som customizado, usa ele
    if (currentAudioBlob) {
      console.log('🎵 Usando som customizado');
      audioData = currentAudioBlob;
    } else {
      console.log('🎵 Carregando som padrão...');
      // Se notification.mp3 foi deletado, este fetch irá falhar (correto)
      const url = chrome.runtime.getURL('notification.mp3');
      console.log('URL:', url);
      const response = await fetch(url);
      const blob = await response.blob();
      audioData = await blobToBase64(blob);
    }
    
    console.log('🔊 Tocando áudio...');
    const audio = new Audio(audioData);
    
    playBtn.textContent = '🔊 Tocando...';
    
    audio.play().then(() => {
      console.log('✅ Áudio tocando');
      showStatus('success', '🔊 Reproduzindo som...');
    }).catch(err => {
      console.error('❌ Erro ao tocar:', err);
      showStatus('error', '❌ Erro ao tocar: ' + err.message);
      playBtn.textContent = '▶️ Testar';
      playBtn.disabled = false;
    });
    
    audio.onended = function() {
      console.log('✅ Áudio terminou');
      playBtn.textContent = '▶️ Testar';
      playBtn.disabled = false;
    };
    
    audio.onerror = function(err) {
      console.error('❌ Erro no áudio:', err);
      showStatus('error', '❌ Erro ao tocar o som');
      playBtn.textContent = '▶️ Testar';
      playBtn.disabled = false;
    };
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
    showStatus('error', '❌ Erro: ' + error.message);
    playBtn.textContent = '▶️ Testar';
    playBtn.disabled = false;
  }
});

// Salva o som selecionado
submitBtn.addEventListener('click', async function() {
  if (!selectedFile) {
    console.log('❌ Nenhum arquivo para salvar');
    return;
  }
  
  console.log('💾 Salvando arquivo...');
  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Salvando...';
  
  try {
    // Converte para base64
    const base64 = await fileToBase64(selectedFile);
    console.log('✅ Arquivo convertido para base64');
    
    // Salva no storage (usando Promisse para aguardar)
    await new Promise((resolve, reject) => {
        chrome.storage.local.set({
            customSound: base64,
            customSoundName: selectedFile.name
        }, () => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve();
        });
    });
    
    console.log('✅ Salvo no storage');
    
    // Atualiza UI
    currentSound.textContent = selectedFile.name;
    currentAudioBlob = base64;
    
    // AVISO MUITO IMPORTANTE: O usuário DEVE recarregar o WhatsApp para o som ser aplicado.
    showStatus('success', '🎉 Som alterado! Recarregue o WhatsApp Web (F5)');
    
    // Reset após 2 segundos
    setTimeout(() => {
      selectedFile = null;
      fileInput.value = '';
      fileSelected.classList.remove('show');
      submitBtn.textContent = '✅ Usar este som';
      submitBtn.disabled = true;
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro ao salvar:', error);
    showStatus('error', '❌ Erro ao salvar: ' + error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = '✅ Usar este som';
  }
});

// Copia chave PIX
copyPixBtn.addEventListener('click', async function() {
  console.log('📋 Copiando PIX...');
  try {
    await navigator.clipboard.writeText(pixKey.textContent);
    copyPixBtn.textContent = '✅ Copiado!';
    showStatus('success', '📋 Chave PIX copiada! Obrigado! 💙');
    
    setTimeout(() => {
      copyPixBtn.textContent = '📋 Copiar chave PIX';
    }, 2000);
  } catch (error) {
    console.error('❌ Erro ao copiar:', error);
    showStatus('error', '❌ Erro ao copiar');
  }
});

// Funções auxiliares
function fileToBase64(file) {
  console.log('🔄 Convertendo arquivo para base64...');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('✅ Conversão completa');
      resolve(reader.result);
    };
    reader.onerror = () => {
      console.error('❌ Erro na conversão');
      reject(new Error('Erro ao ler arquivo'));
    };
    reader.readAsDataURL(file);
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Erro ao ler blob'));
    reader.readAsDataURL(blob);
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showStatus(type, message) {
  console.log('📢 Status:', type, message);
  status.className = 'status ' + type + ' show';
  status.textContent = message;
  
  setTimeout(() => {
    status.classList.remove('show');
  }, 4000);
}

console.log('✅ Popup carregado completamente!');