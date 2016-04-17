<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/27/15
 * Time: 2:23 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewMembershipFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type
 */
class NewMembershipFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('duration', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('price', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ))
            ->add('click', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('videoClick', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('pollClick', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('maxClickInDay', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('maxVideoClickInDay', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('maxPollClickInDay', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refClick', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refVideoClick', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refPollClick', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('purchaseComission', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('upgradeComission', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refLimit', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refDeletionCost', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('active', 'checkbox', array(
                'required'  => false
            ))
            ->add('rentReferral', new RentReferralFormType(), array(
            ))
            ->add('referralPrice', 'collection', array(
                'type'  => new ReferralPriceFormType()
            ))
            ->add('withdrawSettings', new WithdrawSettingsFormType(), array(
            ))
            ->add('countPollAd', 'integer', array(
            ))
            ->add('bannerCredits', 'integer', array(
            ))
            ->add('vipBannerCredits', 'integer', array(
            ))
            ->add('autosurfCredits', 'integer', array(
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\UserBundle\Entity\Membership',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_membership_form_type';
    }
}