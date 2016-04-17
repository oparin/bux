<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/28/15
 * Time: 11:27 AM
 */

namespace Bux\Admin\SetupBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class RentReferralFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type
 */
class RentReferralFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('refPack', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refLimit', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('recycleCost', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ))
            ->add('refTime', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\UserBundle\Entity\RentReferral',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rent_referral_form_type';
    }
}