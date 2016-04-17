<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 5:19 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\AutoSerf;

use Bux\AccountBundle\Form\Type\Ads\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class AutoSerfAdFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\AutoSerf
 */
class AutoSerfAdFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('targetUrl', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxClickInDay', 'integer', array(
            ))
            ->add('terms', 'checkbox', array(
                'mapped'  => false,
                'required'  => true
            ))
            ->add('category', 'entity', array(
                'class' => 'BuxAdminAdvertisementsBundle:AutoSerfCategories',
                'property'  => 'seconds'
            ))
            ->add('memberships', new AdMembershipFormType(), array(
                'required'  => false
            ))
            ->add('countries', new AdCountryFormType(), array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\AutoSerfAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_auto_serf_ad_form_type';
    }
}