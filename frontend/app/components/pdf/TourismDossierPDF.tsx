import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { convertMadToEur } from '../../utils/currency';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007ea7',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00171f',
    marginBottom: 8,
    borderBottom: '1px solid #007ea7',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#333333',
    width: '35%',
  },
  value: {
    fontSize: 8,
    color: '#666666',
    width: '65%',
  },
  twoColumnRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  leftColumn: {
    width: '50%',
    paddingRight: 10,
  },
  rightColumn: {
    width: '50%',
    paddingLeft: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tableHeader: {
    backgroundColor: '#007ea7',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 4,
    fontSize: 7,
    flex: 1,
  },
  listItem: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2,
  },
  questionItem: {
    marginBottom: 6,
    padding: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 2,
  },
  questionText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  answerText: {
    fontSize: 7,
    color: '#666666',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 8,
    color: '#999999',
  },
});

interface TourismDossierPDFProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  dossier: {
    id: number;
    ownerInfo: {
      nom: string;
      prenom: string;
      typePiece: string;
      numero: string;
      telephone: string;
      email: string;
      adresse: string;
      qualite: string;
      registreCommerce?: string;
    };
    establishmentInfo: {
      type: string;
      categorie: string;
      enseigneCommerciale: string;
      dateOuverturePrevue: string;
      registreCommerce: string;
      ice: string;
      numeroCNSS: string;
      telephone: string;
      email: string;
      siteWeb?: string;
      region: string;
      province: string;
    };
    uploadedFiles?: any;
    questionnaireAnswers?: any;
    createdAt: string;
    status: string;
    currentStep: number;
  };
}

export const TourismDossierPDF: React.FC<TourismDossierPDFProps> = ({ user, dossier }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEstablishmentTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel':
        return 'Hôtel';
      case 'riad':
        return 'Riad';
      case 'auberge':
        return 'Auberge';
      case 'maison_hote':
        return 'Maison d\'hôte';
      default:
        return type;
    }
  };

  const getEstablishmentCategoryLabel = (category: string) => {
    switch (category) {
      case '1_etoile':
        return '1 étoile';
      case '2_etoiles':
        return '2 étoiles';
      case '3_etoiles':
        return '3 étoiles';
      case '4_etoiles':
        return '4 étoiles';
      case '5_etoiles':
        return '5 étoiles';
      case 'palace':
        return 'Palace';
      default:
        return category;
    }
  };

  const getQualiteLabel = (qualite: string) => {
    switch (qualite) {
      case 'Propriétaire':
        return 'Propriétaire';
      case 'investisseur':
        return 'Investisseur'; // Keep for backward compatibility
      case 'representant_legal':
        return 'Représentant légal';
      default:
        return qualite;
    }
  };

  const getTypePieceLabel = (type: string) => {
    switch (type) {
      case 'cni':
        return 'CNI';
      case 'passeport':
        return 'Passeport';
      case 'carte_sejour':
        return 'Carte de séjour';
      default:
        return type;
    }
  };

  const renderQuestionnaireSection = (title: string, questions: any[]) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.answerText}>
              Réponse: {questionnaireAnswers[question.key] === 'yes' ? 'Oui' : 
                       questionnaireAnswers[question.key] === 'no' ? 'Non' : 'Non renseigné'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

         const questionnaireAnswers = dossier.questionnaireAnswers || {};

         const formatPrice = (madAmount: number) => {
           const eurAmount = convertMadToEur(madAmount);
           return `${madAmount} MAD (${eurAmount}€)`;
         };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dossier de Classement Touristique</Text>
          <Text style={styles.subtitle}>
            Généré le {formatDate(new Date().toISOString())}
          </Text>
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Client</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Nom:</Text>
                <Text style={styles.value}>{user.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Téléphone:</Text>
                <Text style={styles.value}>{user.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Owner Information */}
        {dossier.ownerInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations du Propriétaire</Text>
            <View style={styles.twoColumnRow}>
              <View style={styles.leftColumn}>
                <View style={styles.row}>
                  <Text style={styles.label}>Nom complet:</Text>
                  <Text style={styles.value}>
                    {dossier.ownerInfo.prenom} {dossier.ownerInfo.nom}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Type de pièce:</Text>
                  <Text style={styles.value}>{getTypePieceLabel(dossier.ownerInfo.typePiece)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>N° de pièce:</Text>
                  <Text style={styles.value}>{dossier.ownerInfo.numero}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Qualité:</Text>
                  <Text style={styles.value}>{getQualiteLabel(dossier.ownerInfo.qualite)}</Text>
                </View>
              </View>
              <View style={styles.rightColumn}>
                <View style={styles.row}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{dossier.ownerInfo.email}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Téléphone:</Text>
                  <Text style={styles.value}>{dossier.ownerInfo.telephone}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Adresse:</Text>
                  <Text style={styles.value}>{dossier.ownerInfo.adresse}</Text>
                </View>
                {dossier.ownerInfo.registreCommerce && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Registre de commerce:</Text>
                    <Text style={styles.value}>{dossier.ownerInfo.registreCommerce}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Establishment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de l'Établissement</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              {dossier.establishmentInfo.enseigneCommerciale && (
                <View style={styles.row}>
                  <Text style={styles.label}>Enseigne commerciale:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.enseigneCommerciale}</Text>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.label}>Type d'établissement:</Text>
                <Text style={styles.value}>{getEstablishmentTypeLabel(dossier.establishmentInfo.type)}</Text>
              </View>
              {dossier.establishmentInfo.categorie && (
                <View style={styles.row}>
                  <Text style={styles.label}>Catégorie:</Text>
                  <Text style={styles.value}>{getEstablishmentCategoryLabel(dossier.establishmentInfo.categorie)}</Text>
                </View>
              )}
              {dossier.establishmentInfo.dateOuverturePrevue && (
                <View style={styles.row}>
                  <Text style={styles.label}>Date d'ouverture prévue:</Text>
                  <Text style={styles.value}>{formatDate(dossier.establishmentInfo.dateOuverturePrevue)}</Text>
                </View>
              )}
              {dossier.establishmentInfo.registreCommerce && (
                <View style={styles.row}>
                  <Text style={styles.label}>Registre de commerce:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.registreCommerce}</Text>
                </View>
              )}
              {dossier.establishmentInfo.ice && (
                <View style={styles.row}>
                  <Text style={styles.label}>ICE:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.ice}</Text>
                </View>
              )}
            </View>
            <View style={styles.rightColumn}>
              {dossier.establishmentInfo.region && (
                <View style={styles.row}>
                  <Text style={styles.label}>Région:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.region}</Text>
                </View>
              )}
              {dossier.establishmentInfo.province && (
                <View style={styles.row}>
                  <Text style={styles.label}>Province:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.province}</Text>
                </View>
              )}
              {dossier.establishmentInfo.telephone && (
                <View style={styles.row}>
                  <Text style={styles.label}>Téléphone:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.telephone}</Text>
                </View>
              )}
              {dossier.establishmentInfo.email && (
                <View style={styles.row}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.email}</Text>
                </View>
              )}
              {dossier.establishmentInfo.siteWeb && (
                <View style={styles.row}>
                  <Text style={styles.label}>Site web:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.siteWeb}</Text>
                </View>
              )}
              {dossier.establishmentInfo.numeroCNSS && (
                <View style={styles.row}>
                  <Text style={styles.label}>N° CNSS:</Text>
                  <Text style={styles.value}>{dossier.establishmentInfo.numeroCNSS}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Uploaded Documents */}
        {dossier.uploadedFiles && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documents Uploadés</Text>
            {dossier.uploadedFiles.cni && dossier.uploadedFiles.cni.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>CNI:</Text>
                <Text style={styles.value}>{dossier.uploadedFiles.cni.map(file => file.originalName).join(', ')}</Text>
              </View>
            )}
            {dossier.uploadedFiles.titreFoncier && dossier.uploadedFiles.titreFoncier.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Titre foncier:</Text>
                <Text style={styles.value}>{dossier.uploadedFiles.titreFoncier.map(file => file.originalName).join(', ')}</Text>
              </View>
            )}
            {dossier.uploadedFiles.permisHabiter && dossier.uploadedFiles.permisHabiter.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Permis d'habiter:</Text>
                <Text style={styles.value}>{dossier.uploadedFiles.permisHabiter.map(file => file.originalName).join(', ')}</Text>
              </View>
            )}
            {dossier.uploadedFiles.assurance && dossier.uploadedFiles.assurance.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Assurance:</Text>
                <Text style={styles.value}>{dossier.uploadedFiles.assurance.map(file => file.originalName).join(', ')}</Text>
              </View>
            )}
            {dossier.uploadedFiles.photos && dossier.uploadedFiles.photos.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Photos:</Text>
                <Text style={styles.value}>{dossier.uploadedFiles.photos.map(file => file.originalName).join(', ')}</Text>
              </View>
            )}
          </View>
        )}

        {/* Questionnaire - Conformity Questions */}
        {Object.keys(questionnaireAnswers).length > 0 && (
          <>
            {renderQuestionnaireSection('Questions de Conformité de Base', [
              { key: 'securite_incendie', question: 'La propriété dispose-t-elle d\'un système de sécurité incendie?' },
              { key: 'installations_electriques', question: 'Les installations électriques sont-elles aux normes?' },
              { key: 'evacuation_eaux_usees', question: 'Y a-t-il un système d\'évacuation des eaux usées conforme?' },
              { key: 'normes_hygiene', question: 'La propriété respecte-t-elle les normes d\'hygiène?' },
              { key: 'fenetres_lumiere_naturelle', question: 'Les chambres disposent-elles de fenêtres avec lumière naturelle?' },
              { key: 'acces_handicapes', question: 'Y a-t-il un accès pour personnes à mobilité réduite?' }
            ])}

            {renderQuestionnaireSection('Espaces et Équipements', [
              { key: 'espace_detente', question: 'Présence d\'espace détente et de repos (hammam traditionnel, sauna, jacuzzi, salle individuelle de massage...)' },
              { key: 'espace_cure', question: 'Présence d\'un espace de cure' },
              { key: 'equipements_animation', question: 'Présence des équipements d\'animation (discothèque et/ou night-club et/ou salle de spectacle)' },
              { key: 'jardin_enfants', question: 'Présence de jardin d\'enfants ou club d\'enfants' },
              { key: 'salle_sport', question: 'Présence d\'une salle de sport' },
              { key: 'structures_sportives', question: 'Présence de structures dédiées aux activités sportives (terrains : tennis, volley-ball, basket-ball, etc.)' },
              { key: 'parcours_golf', question: 'Présence d\'un parcours de golf' }
            ])}

            {/* Restauration Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Espaces de Restauration</Text>
              <View style={styles.twoColumnRow}>
                <View style={styles.leftColumn}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Nombre d'espaces:</Text>
                    <Text style={styles.value}>{questionnaireAnswers.nombre_espaces_restauration || 'Non spécifié'}</Text>
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Superficie (m²):</Text>
                    <Text style={styles.value}>{questionnaireAnswers.superficie_espaces_restauration || 'Non spécifié'}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Capacité d'accueil:</Text>
                <Text style={styles.value}>{questionnaireAnswers.capacite_espaces_restauration || 'Non spécifié'}</Text>
              </View>
            </View>

            {/* Salles Polyvalentes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Salles Polyvalentes</Text>
              <View style={styles.twoColumnRow}>
                <View style={styles.leftColumn}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Nombre de salles:</Text>
                    <Text style={styles.value}>{questionnaireAnswers.nombre_salles_polyvalentes || 'Non spécifié'}</Text>
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Capacité d'accueil:</Text>
                    <Text style={styles.value}>{questionnaireAnswers.capacite_salles_polyvalentes || 'Non spécifié'}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Piscines */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Piscines</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre de piscines:</Text>
                <Text style={styles.value}>{questionnaireAnswers.nombre_piscines || 'Non spécifié'}</Text>
              </View>
            </View>

            {/* Gestion */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Gestion de l'Établissement</Text>
              
              <View style={styles.questionItem}>
                <Text style={styles.questionText}>Gestion par le propriétaire</Text>
                <Text style={styles.answerText}>
                  Réponse: {questionnaireAnswers.gestion_proprietaire === 'yes' ? 'Oui' : 
                           questionnaireAnswers.gestion_proprietaire === 'no' ? 'Non' : 'Non renseigné'}
                </Text>
              </View>

              <View style={styles.questionItem}>
                <Text style={styles.questionText}>Gestion par une société de gestion</Text>
                <Text style={styles.answerText}>
                  Réponse: {questionnaireAnswers.gestion_societe === 'yes' ? 'Oui' : 
                           questionnaireAnswers.gestion_societe === 'no' ? 'Non' : 'Non renseigné'}
                </Text>
                {questionnaireAnswers.gestion_societe === 'yes' && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.answerText}>Raison sociale: {questionnaireAnswers.raison_sociale_societe || 'Non spécifié'}</Text>
                    <Text style={styles.answerText}>Adresse: {questionnaireAnswers.adresse_societe || 'Non spécifié'}</Text>
                    <Text style={styles.answerText}>Type de contractualisation: {questionnaireAnswers.type_contractualisation || 'Non spécifié'}</Text>
                    <Text style={styles.answerText}>Téléphone: {questionnaireAnswers.telephone_societe || 'Non spécifié'}</Text>
                    <Text style={styles.answerText}>Email: {questionnaireAnswers.email_societe || 'Non spécifié'}</Text>
                  </View>
                )}
              </View>

              <View style={styles.questionItem}>
                <Text style={styles.questionText}>Appartenant à une chaine hôtelière</Text>
                <Text style={styles.answerText}>
                  Réponse: {questionnaireAnswers.chaine_hoteliere === 'yes' ? 'Oui' : 
                           questionnaireAnswers.chaine_hoteliere === 'no' ? 'Non' : 'Non renseigné'}
                </Text>
                {questionnaireAnswers.chaine_hoteliere === 'yes' && (
                  <Text style={styles.answerText}>Raison sociale: {questionnaireAnswers.raison_sociale_chaine || 'Non spécifié'}</Text>
                )}
              </View>

              <View style={styles.questionItem}>
                <Text style={styles.questionText}>Gestion par une personne physique</Text>
                <Text style={styles.answerText}>
                  Réponse: {questionnaireAnswers.gestion_personne_physique === 'yes' ? 'Oui' : 
                           questionnaireAnswers.gestion_personne_physique === 'no' ? 'Non' : 'Non renseigné'}
                </Text>
                {questionnaireAnswers.gestion_personne_physique === 'yes' && (
                  <Text style={styles.answerText}>Nom: {questionnaireAnswers.nom_personne_physique || 'Non spécifié'}</Text>
                )}
              </View>
            </View>
          </>
        )}

        {/* Pricing Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récapitulatif des Coûts</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
                     <View style={styles.row}>
                       <Text style={styles.label}>Classement touristique:</Text>
                       <Text style={styles.value}>{formatPrice(1600)}</Text>
                     </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={[styles.row, { borderTop: '1px solid #E5E5E5', paddingTop: 4, marginTop: 4 }]}>
                <Text style={[styles.label, { fontWeight: 'bold', fontSize: 10 }]}>Total:</Text>
                <Text style={[styles.value, { fontWeight: 'bold', fontSize: 10, color: '#007ea7' }]}>
                  {formatPrice(1600)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Dossier #{dossier.id} - Statut: {dossier.status} - Généré par Formalitys
        </Text>
      </Page>
    </Document>
  );
};
