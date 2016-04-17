<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/4/15
 * Time: 6:30 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\VipBanner;

use Bux\AccountBundle\Form\Type\Ads\AdCountryFormType;
use Bux\AccountBundle\Form\Type\Ads\AdMembershipFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class AdFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\VipBanner
 */
class AdFormType extends AbstractType
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
            ->add('bannerUrl', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('terms', 'checkbox', array(
                'mapped'  => false,
                'required'  => true
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
            'data_class' => 'Bux\AdvertiseBundle\Entity\BigBannerAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'banner_ad_form_type';
    }
}