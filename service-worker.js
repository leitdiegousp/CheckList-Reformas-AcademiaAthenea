// Service Worker para CheckList Reformas Academia Athenea
// Versão 1.0.0

const CACHE_NAME = 'checklist-academia-v1';
const urlsToCache = [
    './',
    './index.html',
    './logo-athenea.png',
    'https://unpkg.com/@supabase/supabase-js@2',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalar Service Worker e cachear recursos
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Service Worker: Cacheando recursos...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker: Instalação completa!');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Erro na instalação:', error);
            })
    );
});

// Ativar Service Worker e limpar caches antigos
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: Ativado!');
            return self.clients.claim();
        })
    );
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retornar resposta do cache
                if (response) {
                    return response;
                }

                // Cache miss - fazer requisição na rede
                return fetch(event.request).then(response => {
                    // Verificar se é uma resposta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clonar resposta (pode ser usada apenas uma vez)
                    const responseToCache = response.clone();

                    // Adicionar ao cache para uso futuro
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // Offline e não está no cache - retornar página offline
                    return caches.match('./index.html');
                });
            })
    );
});

// Sincronização em background quando voltar online
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        console.log('🔄 Service Worker: Sincronizando dados...');
        event.waitUntil(syncData());
    }
});

// Função de sincronização
async function syncData() {
    try {
        // Aqui você pode implementar a lógica de sincronização
        // Por exemplo, enviar dados pendentes para o Supabase
        console.log('✅ Service Worker: Dados sincronizados!');
    } catch (error) {
        console.error('❌ Service Worker: Erro na sincronização:', error);
    }
}

// Notificações push (futuro)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação',
        icon: './logo-athenea.png',
        badge: './logo-athenea.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('CheckList Academia', options)
    );
});
