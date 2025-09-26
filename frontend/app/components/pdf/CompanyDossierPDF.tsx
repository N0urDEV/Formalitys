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

interface CompanyDossierPDFProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  dossier: {
    id: number;
    companyName: string;
    headquarters: string;
    capital: number;
    selectedBank: string;
    activities: string[];
    proposedNames: string[];
    associates: any[];
    createdAt: string;
    status: string;
    // Additional company information
    raisonSociale?: string;
    formeJuridique?: string;
    nationalite?: string;
    adresseSiege?: string;
    villeSiege?: string;
    professionActivite?: string;
    telephone?: string;
    fax?: string;
    email?: string;
    numeroArticleTaxeProfessionnelle?: string;
    numeroArticleTaxeServicesCommunaux?: string;
    numeroAffiliationCNSS?: string;
    numeroRegistreCommerce?: string;
    villeRegistreCommerce?: string;
    referenceDepotDeclaration?: string;
    dateDepotDeclaration?: string;
  };
}

export const CompanyDossierPDF: React.FC<CompanyDossierPDFProps> = ({ user, dossier }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getHeadquartersLabel = (headquarters: string) => {
    switch (headquarters) {
      case 'domicile':
        return 'Domicile (gratuit)';
      case 'contrat_domiciliation':
        return 'Contrat de domiciliation (+900 MAD)';
      case 'location_local':
        return 'Location d\'un local';
      default:
        return headquarters;
    }
  };

  const calculateTotalPrice = () => {
    let total = 3300; // Base price
    if (dossier.headquarters === 'contrat_domiciliation') {
      total += 900;
    }
    return total;
  };

  const formatPrice = (madAmount: number) => {
    const eurAmount = convertMadToEur(madAmount);
    return `${madAmount} MAD (${eurAmount}€)`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dossier de Création de Société</Text>
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

        {/* Company Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales de la Société</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Nom de la société:</Text>
                <Text style={styles.value}>{dossier.companyName || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Raison sociale:</Text>
                <Text style={styles.value}>{dossier.raisonSociale || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Forme juridique:</Text>
                <Text style={styles.value}>{dossier.formeJuridique || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Nationalité:</Text>
                <Text style={styles.value}>{dossier.nationalite || 'Non spécifié'}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Siège social:</Text>
                <Text style={styles.value}>{getHeadquartersLabel(dossier.headquarters)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Capital social:</Text>
                <Text style={styles.value}>{dossier.capital?.toLocaleString()} MAD</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Banque sélectionnée:</Text>
                <Text style={styles.value}>{dossier.selectedBank || 'Non spécifié'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Company Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse du Siège Social</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Adresse:</Text>
                <Text style={styles.value}>{dossier.adresseSiege || 'Non spécifié'}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Ville:</Text>
                <Text style={styles.value}>{dossier.villeSiege || 'Non spécifié'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Company Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de Contact</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Téléphone:</Text>
                <Text style={styles.value}>{dossier.telephone || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fax:</Text>
                <Text style={styles.value}>{dossier.fax || 'Non spécifié'}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{dossier.email || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Profession/Activité:</Text>
                <Text style={styles.value}>{dossier.professionActivite || 'Non spécifié'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activities */}
        {dossier.activities && dossier.activities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activités de la Société</Text>
            {dossier.activities.map((activity, index) => (
              <Text key={index} style={styles.listItem}>• {activity}</Text>
            ))}
          </View>
        )}

        {/* Proposed Names */}
        {dossier.proposedNames && dossier.proposedNames.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Noms Proposés</Text>
            {dossier.proposedNames.map((name, index) => (
              <Text key={index} style={styles.listItem}>{index + 1}. {name || 'Non spécifié'}</Text>
            ))}
          </View>
        )}

        {/* Tax Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Fiscales</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>N° Taxe Professionnelle:</Text>
                <Text style={styles.value}>{dossier.numeroArticleTaxeProfessionnelle || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>N° Taxe Services Communaux:</Text>
                <Text style={styles.value}>{dossier.numeroArticleTaxeServicesCommunaux || 'Non spécifié'}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>N° Affiliation CNSS:</Text>
                <Text style={styles.value}>{dossier.numeroAffiliationCNSS || 'Non spécifié'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Commerce Registry Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Registre de Commerce</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>N° Registre de Commerce:</Text>
                <Text style={styles.value}>{dossier.numeroRegistreCommerce || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Ville du Registre:</Text>
                <Text style={styles.value}>{dossier.villeRegistreCommerce || 'Non spécifié'}</Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Référence Dépôt Déclaration:</Text>
                <Text style={styles.value}>{dossier.referenceDepotDeclaration || 'Non spécifié'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date Dépôt Déclaration:</Text>
                <Text style={styles.value}>{dossier.dateDepotDeclaration || 'Non spécifié'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Associates */}
        {dossier.associates && dossier.associates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Associés</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>Nom</Text>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>Type Pièce</Text>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>N° Pièce</Text>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>Email</Text>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>Téléphone</Text>
                <Text style={[styles.tableCell, { color: '#ffffff' }]}>Rôle</Text>
              </View>
              {dossier.associates.map((associate, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>
                    {associate.prenom} {associate.nom}
                  </Text>
                  <Text style={styles.tableCell}>{associate.typePiece}</Text>
                  <Text style={styles.tableCell}>{associate.numero}</Text>
                  <Text style={styles.tableCell}>{associate.email}</Text>
                  <Text style={styles.tableCell}>{associate.telephone}</Text>
                  <Text style={styles.tableCell}>
                    {associate.isGerant ? 'Gérant' : 'Associé'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Pricing Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récapitulatif des Coûts</Text>
          <View style={styles.twoColumnRow}>
            <View style={styles.leftColumn}>
                     <View style={styles.row}>
                       <Text style={styles.label}>Création de société:</Text>
                       <Text style={styles.value}>{formatPrice(3300)}</Text>
                     </View>
                     {dossier.headquarters === 'contrat_domiciliation' && (
                       <View style={styles.row}>
                         <Text style={styles.label}>Domiciliation (6 mois):</Text>
                         <Text style={styles.value}>+{formatPrice(900)}</Text>
                       </View>
                     )}
            </View>
            <View style={styles.rightColumn}>
              <View style={[styles.row, { borderTop: '1px solid #E5E5E5', paddingTop: 4, marginTop: 4 }]}>
                <Text style={[styles.label, { fontWeight: 'bold', fontSize: 10 }]}>Total:</Text>
                <Text style={[styles.value, { fontWeight: 'bold', fontSize: 10, color: '#007ea7' }]}>
                  {formatPrice(calculateTotalPrice())}
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
