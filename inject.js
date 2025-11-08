// inject.js (LEITURA VIA DOM)
console.log('🎵🎵🎵 INJECT.JS EXECUTANDO! 🎵🎵🎵');

// Variável global para armazenar o som
window.__customWhatsAppSound = null;

// Função para carregar o som do elemento de dados
function loadSoundFromDOM() {
  const dataElement = document.getElementById('__whatsapp_sound_data__');
  if (dataElement) {
    const sound = dataElement.getAttribute('data-sound');
    if (sound && sound.startsWith('data:audio/')) {
      window.__customWhatsAppSound = sound;
      console.log('✅✅✅ SOM CUSTOMIZADO CARREGADO:', sound.substring(0, 50) + '...');
      return true;
    }
  }
  console.log('⚠️ Nenhum som customizado disponível');
  return false;
}

// Tenta carregar imediatamente
loadSoundFromDOM();

// Escuta evento de som pronto
window.addEventListener('__whatsapp_sound_ready__', () => {
  console.log('📥 Evento de som pronto recebido');
  loadSoundFromDOM();
});

// Escuta atualizações do som
window.addEventListener('__whatsapp_sound_updated__', () => {
  console.log('🔄 Som foi atualizado');
  loadSoundFromDOM();
});

// Pega o ID da extensão
const scriptSrc = document.currentScript?.src || '';
const match = scriptSrc.match(/chrome-extension:\/\/([a-z]+)/);

if (!match) {
  console.error('❌ Não conseguiu pegar Extension ID');
} else {
  const extensionId = match[1];
  console.log('🔑 Extension ID:', extensionId);
  
  const RealAudio = window.Audio;
  
  // Substitui o construtor Audio
  window.Audio = function(src) {
    console.log('🔊🔊🔊 AUDIO CRIADO! Original:', src);
    
    const audio = new RealAudio();
    
    // Verifica se é o som de notificação do WhatsApp
    const isWhatsAppNotification = !src || 
                                   src === undefined ||
                                   (typeof src === 'string' && (
                                     src.includes('BS_BUUXbKq5.mp3') || 
                                     src.includes('notification')
                                   ));
    
    if (isWhatsAppNotification) {
      console.log('🎯🎯🎯 DETECTADO SOM DE NOTIFICAÇÃO DO WHATSAPP! 🎯🎯🎯');
      
      // Tenta carregar do DOM novamente (caso ainda não tenha carregado)
      if (!window.__customWhatsAppSound) {
        loadSoundFromDOM();
      }
      
      if (window.__customWhatsAppSound) {
        console.log('✅✅✅ APLICANDO SOM CUSTOMIZADO! ✅✅✅');
        audio.src = window.__customWhatsAppSound;
        
        // Log quando o áudio tocar
        audio.addEventListener('play', () => {
          console.log('🎵🎵🎵 SOM CUSTOMIZADO TOCANDO! 🎵🎵🎵');
        });
        
        audio.addEventListener('error', (e) => {
          console.error('❌ Erro ao tocar som customizado:', e);
        });
      } else {
        console.log('⚠️⚠️⚠️ NENHUM SOM CUSTOMIZADO - BLOQUEANDO NOTIFICAÇÃO ⚠️⚠️⚠️');
        console.log('👉 Abra a extensão e adicione um arquivo MP3!');
        // Não define src, bloqueando o som padrão
      }
    } else {
      // Para outros sons, mantém original
      console.log('ℹ️ Mantendo som original (não é notificação)');
      if (src) audio.src = src;
    }
    
    return audio;
  };
  
  // Mantém o prototype
  window.Audio.prototype = RealAudio.prototype;
  
  console.log('✅✅✅ INTERCEPTAÇÃO INSTALADA COM SUCESSO! ✅✅✅');
}