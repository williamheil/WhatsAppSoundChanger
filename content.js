// content.js (SOLUÇÃO COM CSP BYPASS)
console.log('🚀🚀🚀 WHATSAPP SOUND CHANGER CARREGADO! 🚀🚀🚀');

// Função para injetar dados na página via CustomEvent
function injectSoundToPage(sound) {
  // Cria um elemento oculto para passar dados
  const dataElement = document.createElement('div');
  dataElement.id = '__whatsapp_sound_data__';
  dataElement.style.display = 'none';
  dataElement.setAttribute('data-sound', sound || '');
  document.documentElement.appendChild(dataElement);
  
  // Dispara evento customizado
  window.dispatchEvent(new CustomEvent('__whatsapp_sound_ready__'));
  
  console.log('✅ Dados injetados via CustomEvent');
}

// Carrega o som do storage
chrome.storage.local.get(['customSound'], (result) => {
  const sound = result.customSound || null;
  
  if (sound) {
    console.log('✅ Som encontrado no storage:', sound.substring(0, 50) + '...');
  } else {
    console.log('⚠️ Nenhum som customizado no storage');
  }
  
  // Injeta os dados ANTES do script principal
  injectSoundToPage(sound);
  
  // DEPOIS: Injeta o script principal
  const mainScript = document.createElement('script');
  mainScript.src = chrome.runtime.getURL('inject.js');
  (document.head || document.documentElement).appendChild(mainScript);
});

// Monitora mudanças no storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.customSound) {
    console.log('🔄 Som customizado foi atualizado!');
    const newSound = changes.customSound.newValue || null;
    
    // Atualiza o elemento de dados
    const dataElement = document.getElementById('__whatsapp_sound_data__');
    if (dataElement) {
      dataElement.setAttribute('data-sound', newSound || '');
      window.dispatchEvent(new CustomEvent('__whatsapp_sound_updated__'));
    }
  }
});