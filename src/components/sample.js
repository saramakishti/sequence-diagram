export const sample1 = `title Message Flows


    define "Entity A
    **did:12345abc:1**
    _Cluster:0_" as EntityA

    define "Entity B
    **did:56789abc:2**
    _Cluster:1_" as EntityB

    define "Entity C
    **did:67890abci:3**
    _Cluster:2_" as EntityC

    define "Entity D
    **did:78901abc:4**
    _Cluster:3_" as EntityD

    define "Entity E
    **did:89012abc:5**
    _Cluster:4_" as EntityE


begin EntityA, EntityB, EntityC, EntityD, EntityE

group **Data**
EntityA->>EntityB: [1.1.2024 10-00-00] Event message 1
EntityB-->>EntityA: [1.1.2024 10-10-00] Event message 1 response
end

group **Issuance**
EntityC->>EntityD: [1.1.2024 10-00-00] Event message 2
EntityD-->>EntityC: [1.1.2024 10-10-00] Event message 2 response
end

group **Data**
EntityD->>EntityE: [1.1.2024 10-10-00] Event message 3
end

group **Presentation**
EntityE->>EntityB: [1.1.2024 10-10-00] Event message 4
end

group **Issuance**
EntityA->>EntityB: [1.1.2024 10-00-00] Event message 5
end

group **Data**
EntityB->>EntityA: [1.1.2024 10-10-00] Event message 6 
end

group **Data**
EntityC->>EntityE: [1.1.2024 10-00-00] Event message 7
end

group **Issuance**
EntityD->>EntityA: [1.1.2024 10-00-00] Event message 8
end

group **Presentation**
EntityE->>EntityD: [1.1.2024 10-00-00] Event message 9
EntityD-->>EntityE: [1.1.2024 10-00-00] Event message 9 response
end

group **Data**
EntityB->>EntityC: [1.1.2024 10-00-00] Event message 10
end

group **Data**
EntityA->>EntityE: [1.1.2024 10-00-00] Event message 11
end

group **Issuance**
EntityD->>EntityA: [1.1.2024 10-00-00] Event message 12
end
`;

export const sample2 = `
   sequenceDiagram
    participant EntityA as Entity A<br/>did:12345abc:1<br/>Cluster:0
    participant EntityB as Entity B<br/>did:56789abc:2<br/>Cluster:1
    participant EntityC as Entity C<br/>did:67890abci:3<br/>Cluster:2
    participant EntityD as Entity D<br/>did:78901abc:4<br/>Cluster:3
    participant EntityE as Entity E<br/>did:89012abc:5<br/>Cluster:4

    alt Data
    rect rgb(191, 223, 255)
    EntityA->>EntityB: [1.1.2024 10-00-00] Event message 1
    EntityB-->>EntityA: [1.1.2024 10-10-00] Event message 1 response
    end
    end
   
    alt Issuance
    EntityC->>EntityD: [1.1.2024 10-00-00] Event message 2
    EntityD-->>EntityC: [1.1.2024 10-10-00] Event message 2 response
    end

    alt Data
    rect rgb(191, 223, 255)
    EntityD->>EntityE: [1.1.2024 10-10-00] Event message 3
    end 
    end

    alt Presentation
    EntityE->>EntityB: [1.1.2024 10-10-00] Event message 4
    end 

    alt Issuance
    EntityA->>EntityB: [1.1.2024 10-00-00] Event message 5
    end

    alt Data
    rect rgb(191, 223, 255)
    EntityB->>EntityA: [1.1.2024 10-10-00] Event message 6 
    end
    end

    alt Data
    rect rgb(191, 223, 255)
    EntityC->>EntityE: [1.1.2024 10-00-00] Event message 7
    end
    end

    alt Issuance
    EntityD->>EntityA: [1.1.2024 10-00-00] Event message 8
    end

    alt Presentation
    EntityE->>EntityD: [1.1.2024 10-00-00] Event message 9
    EntityD-->>EntityE: [1.1.2024 10-00-00] Event message 9 response
    end

    alt Data
    rect rgb(191, 223, 255)
    EntityB->>EntityC: [1.1.2024 10-00-00] Event message 10
    end
    end

    alt Data
    rect rgb(191, 223, 255)
    EntityA->>EntityE: [1.1.2024 10-00-00] Event message 11
    end
    end

    alt Issuance
    EntityD->>EntityA: [1.1.2024 10-00-00] Event message 12
    end
  `;

export const dataset = {
  events: [
    {
      type: 'data',
      sender: 'entityA',
      receiver: 'entityB',
      content: 'Hello there!',
      time: '10:00:10',
      date: '10.3.2024',
    },
    {
      type: 'presentation',
      sender: 'entityC',
      receiver: 'entityD',
      content: 'Hi, how are you?',
      time: '13:00:10',
      date: '12.11.2024',
    },
    {
      type: 'issuance',
      sender: 'entityB',
      receiver: 'entityA',
      content: 'Hi, how have you been?',
      time: '11:00:10',
      date: '09.03.2024',
    },
  ],
};

export const configEntities = [
  {
    value: 'entityA',
    label: 'Entity A',
  },
  {
    value: 'entityB',
    label: 'Entity B',
  },
  {
    value: 'entityC',
    label: 'Entity C',
  },
  {
    value: 'entityD',
    label: 'Entity D',
  },
  {
    value: 'entityE',
    label: 'Entity E',
  },
];

export const configEventTypes = [
  {
    value: 'data',
    label: 'Data',
  },
  {
    value: 'presentation',
    label: 'Presentation',
  },
  {
    value: 'issuance',
    label: 'Issuance',
  },
];

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
