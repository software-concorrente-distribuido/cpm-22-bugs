import entity.Attendants;
import entity.Client;
import entity.CommunicationChannels;
import vo.Buffer;

public class App {

    private static final Integer ATTENDANTS_AVAILABLE = 5;
    private static final Integer COMMUNICATION_CHANNELS_AVAILABLE = 10;
    private static final Integer MAX_ATTENDING_LINE_LENGTH = 30;

    public static void main(String[] args){

        printProgramInstructions();

        Buffer<Client> attendingLine = new Buffer<>(MAX_ATTENDING_LINE_LENGTH);

        new CommunicationChannels(COMMUNICATION_CHANNELS_AVAILABLE, attendingLine);
        new Attendants(ATTENDANTS_AVAILABLE, attendingLine);

    }

    private static void printProgramInstructions() {
        System.out.println(
                """
                
                =======================================
                        
                        Resolução do Problema
                          Produtor-Consumidor
                            Buffer Limitado
                            
                Autor: Robert-Martins
                GitHub: github.com/Robert-Martins
                            
                =======================================
                
                Aplicação:
                    - Canais de Atendimento responsáveis
                    por redirecionar o atendimento para
                    Atendentes. Fila de Espera (Buffer)
                    limitada em um valor constante
                    
                Grupo:
                    - Os Borboletos
                    
                Componentes do Programa:
                    - Classe App: responsável por
                    inicializar os demais componentes,
                    Buffer e as ThreadPools de
                    Atendentes e Canais de Comunicação
                    
                    - Classe Genérica Buffer: representa
                    o Buffer do problema. Mantém uma fila,
                    a lógica para inserção e remoção de
                    itens e referência das Threads à fila.
                    Está presente em todos os outros objetos,
                    com exceção do Client.
                    
                    - Classe Abstrata Genérica WorkThread:
                    modelo para classes que pertencerão
                    a algum ThreadPool.
                    
                    - Classe Abstrata Genérica ThreadPool:
                    representa um Pool de Threads. Ou seja,
                    é representa pela instância e gerência
                    de Threads em seu contexto.
                    
                    - Classes Attendant e CommunicationChannel:
                    extende a WorkThread e manipula
                    elementos Client. A implementação
                    de métodos abstratos e outros
                    métodos privados está em coerência com a
                    manipulação do tipo em questão, Client.
                    
                    - Classes Attendants e CommunicationChannels:
                    extendem a ThreadPool e mantém Threads que
                    manipulam elementos Client. A implementação
                    de métodos abstratos e outros
                    métodos privados está em coerência com a
                    manipulação do tipo em questão, Client.
                    
                    - Classe Client: representa o elemento principal
                    que será manipulado pelos demais componentes.
                
                """
        );
    }

}
